import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../test/type-orm-module-options';
import { User } from '../users/entities/user.entity';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';

describe('WebsiteService', () => {
  let service: BoardsService;
  let connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardsService],
      imports: [
        TypeOrmModule.forFeature([Board]),
        ConfigModule.forRoot({ envFilePath: '.test.env' }),
        getTypeOrmModule([Board, User]),
      ],
    }).compile();

    connection = module.get(getConnectionToken());

    service = module.get<BoardsService>(BoardsService);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
