import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../test/type-orm-module-options';
import { User } from '../users/entities/user.entity';
import { BoardsService } from './boards.service';
import { BoardColumn } from './entities/board-column.entity';
import { Board } from './entities/board.entity';
import { Card } from './entities/card.entity';

describe('BoardService', () => {
  let service: BoardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
      imports: [
        TypeOrmModule.forFeature([Board, BoardColumn, Card]),
        ConfigModule.forRoot({ envFilePath: '.test.env' }),
        getTypeOrmModule([Board, User, BoardColumn, Card]),
      ],
    }).compile();

    service = module.get<BoardsService>(BoardsService);
  });

  describe('create', () => {
    it('should create column', async () => {});
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
