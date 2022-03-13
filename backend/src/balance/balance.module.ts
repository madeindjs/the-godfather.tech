import { Module } from '@nestjs/common';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { PaiementsModule } from '../paiements/paiements.module';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

@Module({
  imports: [CampaignsModule, PaiementsModule],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
