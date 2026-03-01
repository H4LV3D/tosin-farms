import { Module } from '@nestjs/common';
import { DispatchManagerService } from './dispatch.service';
import { DhlDispatchStrategy } from './strategies/dhl-dispatch.strategy';
import { FedexDispatchStrategy } from './strategies/fedex-dispatch.strategy';

@Module({
  providers: [
    DispatchManagerService,
    DhlDispatchStrategy,
    FedexDispatchStrategy,
  ],
  exports: [DispatchManagerService],
})
export class DispatchModule {}
