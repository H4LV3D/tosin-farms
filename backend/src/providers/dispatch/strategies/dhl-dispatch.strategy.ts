import { Injectable, Logger } from '@nestjs/common';
import { DispatchProviderInterface } from '../dispatch-provider.interface';

@Injectable()
export class DhlDispatchStrategy implements DispatchProviderInterface {
  private readonly logger = new Logger(DhlDispatchStrategy.name);

  async calculateShipping(
    origin: string,
    destination: string,
    weight: number,
  ): Promise<number> {
    this.logger.log(
      `Calculating DHL shipping from ${origin} to ${destination} for ${weight}kg`,
    );
    // Mock calculation
    return weight * 10;
  }

  async createShipment(
    orderId: string,
    origin: string,
    destination: string,
  ): Promise<string> {
    this.logger.log(`Creating DHL shipment for order ${orderId}`);
    return `DHL-${Math.random().toString(36).substring(7).toUpperCase()}`;
  }

  async trackShipment(trackingNumber: string): Promise<string> {
    this.logger.log(`Tracking DHL shipment ${trackingNumber}`);
    return 'IN_TRANSIT';
  }
}
