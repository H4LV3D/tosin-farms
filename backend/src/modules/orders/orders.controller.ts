import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  BadRequestException,
  Req,
  UseGuards,
  Param,
} from '@nestjs/common';
import { OrdersService, CheckoutDto } from './orders.service';
import { PaymentService } from '../../providers/payment/payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsIn,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ShippingAddressDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsString() @IsNotEmpty() phone: string;
  @IsString() @IsNotEmpty() street: string;
  @IsString() @IsNotEmpty() city: string;
  @IsString() @IsNotEmpty() state: string;
  @IsString() @IsOptional() zipCode?: string;
}

class CheckoutBodyDto {
  @IsEmail() email: string;
  @IsIn(['DHL', 'FEDEX']) dispatchType: 'DHL' | 'FEDEX';
  @ValidateNested() @Type(() => ShippingAddressDto) shippingAddress: ShippingAddressDto;
  @IsString() @IsOptional() note?: string;
}

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentService: PaymentService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: any, @Body() body: CheckoutBodyDto) {
    const dto: CheckoutDto = {
      email: body.email,
      dispatchType: body.dispatchType as any,
      shippingAddress: body.shippingAddress,
      note: body.note,
    };
    return this.ordersService.checkout(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyOrders(@Req() req: any) {
    return this.ordersService.getMyOrders(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrder(@Req() req: any, @Param('id') id: string) {
    return this.ordersService.getOrderById(id, req.user.userId);
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
