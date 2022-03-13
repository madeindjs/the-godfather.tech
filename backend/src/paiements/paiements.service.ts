import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { Paiement } from './entities/paiement.entity';

@Injectable()
export class PaiementsService {
  private readonly logger = new Logger(PaiementsService.name);
  private readonly stripe: Stripe;
  private readonly endpointSecret: string;

  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService,
    @InjectRepository(Paiement)
    private readonly paiementsRepository: Repository<Paiement>,
  ) {
    const stripeSecret = this.configService.get('STRIPE_CLIENT_SECRET');
    this.endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    this.stripe = new Stripe(stripeSecret, { apiVersion: '2020-08-27' });
  }

  create(createPaiementDto: CreatePaiementDto) {
    return this.stripe.paymentIntents.create({
      amount: createPaiementDto.amount * 100,
      currency: 'eur',
      metadata: {
        email: createPaiementDto.user.email,
      },
      // automatic_payment_methods: { enabled: true },
    });
  }

  async handleWebhook(request: Request) {
    let event: Stripe.Event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (this.endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = this.stripe.webhooks.constructEvent(
          request.body,
          signature,
          this.endpointSecret,
        );
      } catch (err) {
        throw new BadRequestException(
          err,
          'Webhook signature verification failed.',
        );
      }
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;

        // @ts-ignore
        const email = paymentIntent.metadata.email;
        // @ts-ignore
        const amount = paymentIntent.amount / 100;

        this.logger.log(`PaymentIntent for ${amount} was successful!`);

        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
          throw new BadRequestException(`${email} is not a valid user`);
        }

        await this.paiementsRepository.save({ amount, user });
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        this.logger.warn(`Unhandled event type ${event.type}.`);
    }
  }

  findAllForUser(user: User) {
    return this.paiementsRepository.find({ user });
  }

  async findTotalForUser(user: User) {
    const paiements = await this.findAllForUser(user);

    return paiements.reduce((acc, p) => Number(p.amount) + acc, 0);
  }

  findOne(id: number) {
    return `This action returns a #${id} paiement`;
  }

  update(id: number, updatePaiementDto: UpdatePaiementDto) {
    return `This action updates a #${id} paiement`;
  }

  remove(id: number) {
    return `This action removes a #${id} paiement`;
  }
}
