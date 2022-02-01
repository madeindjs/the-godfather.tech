import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Campaign])],
  controllers: [CampaignsController],
  providers: [CampaignsService],
})
export class CampaignsModule {}
