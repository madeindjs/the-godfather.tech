import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreditsService } from './credits.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req: Request & { user: User }) {
    const credits = await this.creditsService.findAll(req.user);
    const rest = credits.reduce((a, b) => a + b.amount, 0);
    return { history: credits, rest };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async buy(@Request() req: Request & { user: User }) {
    await this.creditsService.addToUser(req.user, 10);
  }
}
