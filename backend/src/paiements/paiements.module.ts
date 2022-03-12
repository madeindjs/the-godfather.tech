import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaiementsController } from './paiements.controller';
import { PaiementsService } from './paiements.service';

@Module({
  imports: [ConfigModule],
  controllers: [PaiementsController],
  providers: [PaiementsService],
})
export class PaiementsModule {}
