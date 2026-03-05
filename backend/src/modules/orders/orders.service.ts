import {
  Injectable,
  BadRequestException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { PaymentService } from '../../providers/payment/payment.service';
import {
  DispatchManagerService,
  DispatchProviderType,
} from '../../providers/dispatch/dispatch.service';

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode?: string;
}

export interface CheckoutDto {
  email: string;
  dispatchType: DispatchProviderType;
  shippingAddress: ShippingAddress;
  note?: string;
  items?: { productId: string; quantity: number }[];
}

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cartService: CartService,
    private readonly paymentService: PaymentService,
    private readonly dispatchManager: DispatchManagerService,
  ) {}

  async checkout(userId: string, dto: CheckoutDto) {
    const { email, dispatchType, shippingAddress, note, items } = dto;

    // 1. Get user's cart or use items from payload
    let cartItems = items;
    if (!cartItems || cartItems.length === 0) {
      const cart = await this.cartService.getCart(userId);
      if (!cart || cart.items.length === 0) {
        throw new BadRequestException('Cart is empty. Cannot checkout.');
      }
      cartItems = cart.items;
    }

    // 2. Validate and fetch real product prices from DB
    const productIds = cartItems.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Ensure all products exist
    const productMap = new Map(products.map((p) => [p.id, p]));
    for (const item of cartItems) {
      if (!productMap.has(item.productId)) {
        throw new NotFoundException(
          `Product ${item.productId} no longer exists.`,
        );
      }
      const product = productMap.get(item.productId)!;
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for "${product.name}". Available: ${product.stock}.`,
        );
      }
    }

    // 3. Calculate subtotal using real DB prices
    const subtotal = cartItems.reduce((sum, item) => {
      const product = productMap.get(item.productId)!;
      return sum + product.price * item.quantity;
    }, 0);

    // 4. Calculate shipping cost
    const dispatchProvider = this.dispatchManager.getProvider(dispatchType);
    const shippingCost = await dispatchProvider.calculateShipping(
      'Tosi Farms Warehouse, Ogun State',
      `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}`,
      cartItems.reduce((sum, i) => sum + i.quantity, 0),
    );

    const finalAmount = subtotal + shippingCost;

    // 5. Create Pending Order in a Postgres Transaction
    const order = await this.prisma.$transaction(async (tx) => {
      // Decrement stock atomically
      for (const item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return tx.order.create({
        data: {
          userId,
          totalAmount: finalAmount,
          status: 'PENDING',
          dispatchProvider: dispatchType,
          shippingAddress: JSON.stringify(shippingAddress),
          customerNote: note,
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: productMap.get(item.productId)!.price,
            })),
          },
        },
        include: {
          items: { include: { product: true } },
        },
      });
    });

    // 6. Initialize Payment
    const paymentUrl = await this.paymentService.initializePayment(
      email,
      finalAmount,
      order.id,
    );

    // 7. Clear cart after successful order creation
    await this.cartService.clearCart(userId);

    this.logger.log(
      `Order ${order.id} created for user ${userId} — ₦${finalAmount}`,
    );

    return {
      orderId: order.id,
      amount: finalAmount,
      shipping: shippingCost,
      subtotal,
      currency: 'NGN',
      paymentUrl,
      itemCount: cartItems.length,
    };
  }

  async getShippingOptions(
    userId: string,
    shippingAddress: ShippingAddress,
    items?: { productId: string; quantity: number }[],
  ) {
    let weight = 0;
    if (items && items.length > 0) {
      weight = items.reduce((sum, item) => sum + item.quantity, 0);
    } else {
      const cart = await this.cartService.getCart(userId);
      if (!cart || cart.items.length === 0) {
        throw new BadRequestException('Cart is empty.');
      }
      weight = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    const destination = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state}`;
    const origin = 'Tosi Farms Warehouse, Ogun State';

    const providers: DispatchProviderType[] = ['GIG', 'FEDEX', 'DHL'];
    const options = await Promise.all(
      providers.map(async (type) => {
        const provider = this.dispatchManager.getProvider(type);
        const cost = await provider.calculateShipping(
          origin,
          destination,
          weight,
        );
        return {
          id: type,
          price: cost,
          label:
            type === 'DHL'
              ? 'DHL Express'
              : type === 'FEDEX'
                ? 'FedEx'
                : 'GIG Logistics',
          desc:
            type === 'DHL'
              ? '2-4 business days'
              : type === 'FEDEX'
                ? '3-5 business days'
                : '1-3 business days',
        };
      }),
    );

    return options.sort((a, b) => a.price - b.price); // Cheapest first
  }

  async getMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, images: true } },
          },
        },
      },
    });
  }

  async getOrderById(orderId: string, userId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: { include: { product: true } },
      },
    });
    if (!order) throw new NotFoundException(`Order ${orderId} not found.`);
    return order;
  }

  async processWebhook(
    event: string,
    payload: { data: { reference: string; id: number | string } },
  ) {
    if (event === 'charge.success') {
      const orderId = String(payload.data.reference);
      this.logger.log(`Payment confirmed for Order ${orderId}`);

      const order = await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID', paymentReference: String(payload.data.id) },
      });

      // Trigger dispatch
      const provider = this.dispatchManager.getProvider(
        order.dispatchProvider as DispatchProviderType,
      );
      const trackingNo = await provider.createShipment(
        order.id,
        'Tosi Farms Warehouse, Ogun State',

        order.shippingAddress || 'Customer Address',
      );

      await this.prisma.order.update({
        where: { id: order.id },
        data: { status: 'SHIPPED', trackingNumber: trackingNo },
      });

      this.logger.log(
        `Order ${orderId} marked SHIPPED. Tracking: ${trackingNo}`,
      );
    }
  }
}
