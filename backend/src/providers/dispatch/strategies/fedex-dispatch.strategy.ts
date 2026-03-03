import { Injectable, Logger } from '@nestjs/common';
import { DispatchProviderInterface } from '../dispatch-provider.interface';

@Injectable()
export class FedexDispatchStrategy implements DispatchProviderInterface {
  private readonly logger = new Logger(FedexDispatchStrategy.name);

  async calculateShipping(
    origin: string,
    destination: string,
    weight: number,
  ): Promise<number> {
    this.logger.log(
      `Calculating FedEx shipping from ${origin} to ${destination} for ${weight}kg`,
    );
    // Mock calculation
    return weight * 12 + 5; // Different pricing formula
  }

  async createShipment(
    orderId: string,
    origin: string,
    destination: string,
  ): Promise<string> {
    this.logger.log(`Creating FedEx shipment for order ${orderId}`);
    return `FDX-${Math.random().toString(36).substring(7).toUpperCase()}`;
  }

  async trackShipment(trackingNumber: string): Promise<string> {
    this.logger.log(`Tracking FedEx shipment ${trackingNumber}`);
    return 'PROCESSING';
  }
}
