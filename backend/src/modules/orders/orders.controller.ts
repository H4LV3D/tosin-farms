import {
  Controller,
  Post,
  Body,
  Headers,
  BadRequestException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { PaymentService } from '../../providers/payment/payment.service';
import type { DispatchProviderType } from '../../providers/dispatch/dispatch.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assume this exists

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentService: PaymentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(
    @Req() req: any,
    @Body('email') email: string,
    @Body('dispatchType') dispatchType: DispatchProviderType,
  ) {
    if (!email || !dispatchType) {
      throw new BadRequestException('Email and dispatchType are required.');
    }
    return this.ordersService.checkout(req.user.userId, email, dispatchType);
  }

  @Post('webhook/paystack')
  async handlePaystackWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Body() payload: any,
  ) {
    if (!this.paymentService.verifyWebhookSignature(signature, payload)) {
      throw new BadRequestException('Invalid webhook signature');
    }

    if (payload.event === 'charge.success') {
      await this.ordersService.processWebhook(payload.event, payload);
    }
    return { status: 'success' };
  }
}
