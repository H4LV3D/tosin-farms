import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CartModule } from '../cart/cart.module';
import { PaymentModule } from '../../providers/payment/payment.module';
import { DispatchModule } from '../../providers/dispatch/dispatch.module';

@Module({
  imports: [CartModule, PaymentModule, DispatchModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
