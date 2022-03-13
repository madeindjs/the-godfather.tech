import { Injectable } from '@nestjs/common';
import { CampaignsService } from '../campaigns/campaigns.service';
import { PaiementsService } from '../paiements/paiements.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BalanceService {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly paiementsService: PaiementsService,
  ) {}

  async getBalanceForUser(user: User) {
    const total = await this.paiementsService.findTotalForUser(user);
    const sub = await this.campaignsService.findTotalForUser(user);

    return total - sub;
  }
}
