import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';

@Injectable()
export class PaiementsService {
  private readonly stripe;

  constructor(private configService: ConfigService) {
    this.stripe = require('stripe')(
      this.configService.get('STRIPE_CLIENT_SECRET'),
    );
  }

  create(createPaiementDto: CreatePaiementDto) {
    return this.stripe.paymentIntents.create({
      amount: createPaiementDto.amount * 10,
      currency: 'eur',
      // automatic_payment_methods: { enabled: true },
    });
  }

  findAll() {
    return `This action returns all paiements`;
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
