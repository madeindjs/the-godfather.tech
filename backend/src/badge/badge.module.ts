import { Module } from '@nestjs/common';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { GithubModule } from '../github/github.module';
import { ViewsModule } from '../views/views.module';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';

@Module({
  imports: [CampaignsModule, GithubModule, ViewsModule],
  controllers: [BadgeController],
  providers: [BadgeService],
})
export class BadgeModule {}
