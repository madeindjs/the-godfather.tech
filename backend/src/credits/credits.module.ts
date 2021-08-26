import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { CreditsController } from './credits.controller';
import { CreditsService } from './credits.service';
import { Credit } from './entities/credit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credit])],
  controllers: [CreditsController],
  providers: [CreditsService],
  exports: [CreditsService],
})
export class CreditsModule {}
