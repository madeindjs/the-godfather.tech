import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { PaiementsService } from './paiements.service';

@Controller('/api/v1/paiements')
export class PaiementsController {
  constructor(private readonly paiementsService: PaiementsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getList(@Request() { user }: Req & { user: User }) {
    return this.paiementsService.findAllForUser(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createPaiementDto: CreatePaiementDto,
    @Request() { user }: Req & { user: User },
  ) {
    const { client_secret: clientSecret } = await this.paiementsService.create({
      ...createPaiementDto,
      user,
    });

    return { clientSecret };
  }

  @Post('webhooks')
  @HttpCode(201)
  async webhook(@Request() request: Req) {
    return this.paiementsService.handleWebhook(request);
  }
}
