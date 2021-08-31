import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CreditsModule } from '../credits/credits.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { BoardColumnsController } from './board-columns.controller';
import { BoardColumnsService } from './board-columns.service';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { BoardColumn } from './entities/board-column.entity';
import { Board } from './entities/board.entity';
import { Card } from './entities/card.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([User, Board, BoardColumn, Card]),
    CreditsModule,
  ],
  controllers: [BoardsController, BoardColumnsController, CardsController],
  providers: [BoardsService, BoardColumnsService, CardsService],
})
export class BoardsModule {}
