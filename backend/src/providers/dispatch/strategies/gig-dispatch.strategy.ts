import { Injectable, Logger } from '@nestjs/common';
import { DispatchProviderInterface } from '../dispatch-provider.interface';

@Injectable()
export class GigDispatchStrategy implements DispatchProviderInterface {
  private readonly logger = new Logger(GigDispatchStrategy.name);

  async calculateShipping(
    origin: string,
    destination: string,
    weight: number,
  ): Promise<number> {
    this.logger.log(
      `Calculating GIG Logistics shipping from ${origin} to ${destination} for ${weight}kg`,
    );
    // Mock calculation for GIG - slightly cheaper than DHL but varies
    return weight * 8;
  }

  async createShipment(
    orderId: string,
    origin: string,
    destination: string,
  ): Promise<string> {
    this.logger.log(`Creating GIG Logistics shipment for order ${orderId}`);
    return `GIG-${Math.random().toString(36).substring(7).toUpperCase()}`;
  }

  async trackShipment(trackingNumber: string): Promise<string> {
    this.logger.log(`Tracking GIG Logistics shipment ${trackingNumber}`);
    return 'IN_TRANSIT';
  }
}
