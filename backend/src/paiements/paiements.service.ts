import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';
import { CreatePaiementDto } from './dto/create-paiement.dto';

@Injectable()
export class PaiementsService {
  private readonly logger = new Logger(PaiementsService.name);
  private readonly stripe: Stripe;
  private readonly endpointSecret: string;

  constructor(private configService: ConfigService) {
    const stripeSecret = this.configService.get('STRIPE_CLIENT_SECRET');
    this.endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    this.stripe = new Stripe(stripeSecret, { apiVersion: '2020-08-27' });
  }

  createIntent(createPaiementDto: CreatePaiementDto) {
    return this.stripe.paymentIntents.create({
      amount: createPaiementDto.amount * 100,
      currency: 'eur',
      metadata: {
        email: createPaiementDto.user.email,
      },
      // automatic_payment_methods: { enabled: true },
    });
  }

  extractEvent(request: Request): Stripe.Event {
    this.logger.debug(`receive event from stripe`);

    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      return this.stripe.webhooks.constructEvent(
        // @ts-ignore
        request.rawBody,
        signature,
        this.endpointSecret,
      );
    } catch (err) {
      this.logger.error({ err, body: request.body, headers: request.headers });
      throw new BadRequestException(
        err,
        'Webhook signature verification failed.',
      );
    }
  }
}
