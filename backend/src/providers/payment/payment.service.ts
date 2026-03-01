import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly paystackSecretKey: string;

  constructor(private configService: ConfigService) {
    this.paystackSecretKey =
      this.configService.get<string>('PAYSTACK_SECRET_KEY') || 'mock-secret';
  }

  async initializePayment(
    email: string,
    amount: number,
    reference: string,
  ): Promise<string> {
    this.logger.log(
      `Initializing Paystack payment for ${email}, amount: ${amount}, ref: ${reference}`,
    );
    // This is where you would make a REST call to https://api.paystack.co/transaction/initialize
    // For this e-commerce architecture skeleton, we return a mock authorization URL.
    return `https://checkout.paystack.com/mock-auth-${reference}`;
  }

  verifyWebhookSignature(signature: string, payload: any): boolean {
    const hash = crypto
      .createHmac('sha512', this.paystackSecretKey)
      .update(JSON.stringify(payload))
      .digest('hex');

    return hash === signature;
  }
}
