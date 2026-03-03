export interface DispatchProviderInterface {
  /**
   * Calculate the shipping cost for an order.
   * @param origin origin address or coordinate
   * @param destination destination address or coordinate
   * @param weight weight of the package
   * @returns The calculated shipping cost.
   */
  calculateShipping(
    origin: string,
    destination: string,
    weight: number,
  ): Promise<number>;

  /**
   * Create a shipment with the provider.
   * @param orderId the order ID for internal reference
   * @param origin origin address
   * @param destination destination address
   * @returns A string containing the tracking number.
   */
  createShipment(
    orderId: string,
    origin: string,
    destination: string,
  ): Promise<string>;

  /**
   * Track the shipment status.
   * @param trackingNumber the provider tracking number
   * @returns A status string (e.g., 'IN_TRANSIT', 'DELIVERED').
   */
  trackShipment(trackingNumber: string): Promise<string>;
}
