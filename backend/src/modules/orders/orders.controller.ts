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
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CartItemDto {
  @IsString() @IsNotEmpty() productId: string;
  @IsInt() @Min(1) quantity: number;
}

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
  @IsIn(['DHL', 'FEDEX', 'GIG']) dispatchType: 'DHL' | 'FEDEX' | 'GIG';
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;
  @IsString() @IsOptional() note?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items?: CartItemDto[];
}

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentService: PaymentService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('checkout')
  async checkout(
    @Req() req: { user: { userId: string } },
    @Body() body: CheckoutBodyDto,
  ) {
    const dto: CheckoutDto = {
      email: body.email,
      dispatchType: body.dispatchType,
      shippingAddress: body.shippingAddress,
      note: body.note,
      items: body.items,
    };
    return this.ordersService.checkout(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('shipping-options')
  async getShippingOptions(
    @Req() req: { user: { userId: string } },
    @Body('shippingAddress') shippingAddress: ShippingAddressDto,
    @Body('items') items?: CartItemDto[],
  ) {
    if (!shippingAddress) {
      throw new BadRequestException('shippingAddress is required');
    }
    return this.ordersService.getShippingOptions(
      req.user.userId,
      shippingAddress,
      items,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyOrders(@Req() req: { user: { userId: string } }) {
    return this.ordersService.getMyOrders(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrder(
    @Req() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.ordersService.getOrderById(id, req.user.userId);
  }

  @Post('webhook/paystack')
  async handlePaystackWebhook(
    @Headers('x-paystack-signature') signature: string,
    @Body()
    payload: {
      event: string;
      data: { reference: string; id: number | string };
      [key: string]: unknown;
    },
  ) {
    if (
      !this.paymentService.verifyWebhookSignature(signature, payload as any)
    ) {
      throw new BadRequestException('Invalid webhook signature');
    }
    if (payload.event === 'charge.success') {
      await this.ordersService.processWebhook(payload.event, payload);
    }
    return { status: 'success' };
  }
}
