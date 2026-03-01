import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { PaymentService } from '../../providers/payment/payment.service';
import {
  DispatchManagerService,
  DispatchProviderType,
} from '../../providers/dispatch/dispatch.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
    private readonly paymentService: PaymentService,
    private readonly dispatchManager: DispatchManagerService,
  ) {}

  async checkout(
    userId: string,
    email: string,
    dispatchType: DispatchProviderType,
  ) {
    const cart = await this.cartService.getCart(userId);

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty. Cannot checkout.');
    }

    // 1. Calculate Total (Ideally, verify prices against the database)
    // For brevity, we assume 100 per unit
    const subtotal = cart.items.reduce(
      (sum, item) => sum + 100 * item.quantity,
      0,
    );

    // 2. Calculate Shipping via Strategy
    const dispatchProvider = this.dispatchManager.getProvider(dispatchType);
    const shipping = await dispatchProvider.calculateShipping(
      'Warehouse A',
      'Customer Address',
      5,
    );

    const finalAmount = subtotal + shipping;

    // 3. Create Pending Order in Postgres Transaction
    const order = await this.prisma.order.create({
      data: {
        userId,
        totalAmount: finalAmount,
        status: 'PENDING',
        dispatchProvider: dispatchType,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: 100, // Example: locked price
          })),
        },
      },
    });

    // 4. Initialize Payment
    const paymentUrl = await this.paymentService.initializePayment(
      email,
      finalAmount,
      order.id,
    );

    // 5. Clear the Cache (Optional: Clear after confirmed payment webhook instead)
    await this.cartService.clearCart(userId);

    return {
      orderId: order.id,
      amount: finalAmount,
      currency: 'NGN',
      paymentUrl,
    };
  }

  async processWebhook(event: string, payload: any) {
    if (event === 'charge.success') {
      const orderId = payload.data.reference;

      this.logger.log(`Payment confirmed for Order ${orderId}`);

      const order = await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID', paymentReference: payload.data.id.toString() },
      });

      // Trigger Dispatch
      const provider = this.dispatchManager.getProvider(
        order.dispatchProvider as DispatchProviderType,
      );
      const trackingNo = await provider.createShipment(
        order.id,
        'Warehouse A',
        'Customer Addr',
      );

      await this.prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'SHIPPED',
          trackingNumber: trackingNo,
        },
      });

      this.logger.log(
        `Order ${orderId} marked SHIPPED with Tracking: ${trackingNo}`,
      );
    }
  }
}
