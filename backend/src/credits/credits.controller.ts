import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreditsService } from './credits.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() { user }: Request & { user: User }) {
    const credits = await this.creditsService.findAll(user);
    const rest = credits.reduce((a, b) => a + b.amount, 0);
    return { history: credits, rest };
  }

  @Get('summary')
  @UseGuards(JwtAuthGuard)
  async summary(@Request() { user }: Request & { user: User }) {
    return {
      total: await this.creditsService.getBoughtAmount(user),
      current: await this.creditsService.getAmount(user),
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async buy(@Request() req: Request & { user: User }) {
    await this.creditsService.addToUser(req.user, 10);
  }
}
