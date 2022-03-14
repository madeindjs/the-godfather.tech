import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { PaiementsService } from './paiements.service';

@Module({
  imports: [ConfigModule, UsersModule],
  providers: [PaiementsService],
  exports: [PaiementsService],
})
export class PaiementsModule {}
