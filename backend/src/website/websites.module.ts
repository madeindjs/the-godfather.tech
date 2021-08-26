import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CreditsModule } from '../credits/credits.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { Website } from './entities/website.entity';
import { WebsitesController } from './websites.controller';
import { WebsitesService } from './websites.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([User, Website]),
    CreditsModule,
  ],
  controllers: [WebsitesController],
  providers: [WebsitesService],
})
export class WebsitesModule {}
