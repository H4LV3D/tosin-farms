import { Injectable, NotFoundException } from '@nestjs/common';
import { DispatchProviderInterface } from './dispatch-provider.interface';
import { DhlDispatchStrategy } from './strategies/dhl-dispatch.strategy';
import { FedexDispatchStrategy } from './strategies/fedex-dispatch.strategy';

export type DispatchProviderType = 'DHL' | 'FEDEX';

@Injectable()
export class DispatchManagerService {
  private strategies: Map<DispatchProviderType, DispatchProviderInterface>;

  constructor(
    private readonly dhlStrategy: DhlDispatchStrategy,
    private readonly fedexStrategy: FedexDispatchStrategy,
  ) {
    this.strategies = new Map();
    this.strategies.set('DHL', this.dhlStrategy);
    this.strategies.set('FEDEX', this.fedexStrategy);
  }

  getProvider(type: DispatchProviderType): DispatchProviderInterface {
    const provider = this.strategies.get(type);
    if (!provider) {
      throw new NotFoundException(`Dispatch provider '${type}' not supported`);
    }
    return provider;
  }
}
