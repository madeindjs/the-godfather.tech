import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { BalanceService } from './balance.service';

@Controller('api/v1/balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBalance(@Request() { user }: Req & { user: User }) {
    const balance = await this.balanceService.getBalanceForUser(user);

    return { balance };
  }
}
