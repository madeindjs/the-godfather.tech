import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../test/type-orm-module-options';
import { CreditsModule } from '../credits/credits.module';
import { Credit } from '../credits/entities/credit.entity';
import { User } from '../users/entities/user.entity';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardColumn } from './entities/board-column.entity';
import { Board } from './entities/board.entity';
import { Card } from './entities/card.entity';

describe('BoardsController', () => {
  let controller: BoardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardsController],
      providers: [BoardsService],
      imports: [
        CreditsModule,
        TypeOrmModule.forFeature([Board, Credit, BoardColumn, Card]),
        EventEmitterModule.forRoot(),
        ConfigModule.forRoot({ envFilePath: '.test.env' }),
        getTypeOrmModule([Board, User, Credit, BoardColumn, Card]),
      ],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
