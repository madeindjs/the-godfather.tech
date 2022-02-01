import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from '../campaigns/campaigns.module';
import { User } from '../users/entities/user.entity';
import { View } from './entities/view.entity';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';

@Module({
  imports: [TypeOrmModule.forFeature([View, User]), CampaignsModule],
  controllers: [ViewsController],
  providers: [ViewsService],
})
export class ViewsModule {}
