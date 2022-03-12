import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Paiement } from './entities/paiement.entity';
import { PaiementsController } from './paiements.controller';
import { PaiementsService } from './paiements.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Paiement]), UsersModule],
  controllers: [PaiementsController],
  providers: [PaiementsService],
})
export class PaiementsModule {}
