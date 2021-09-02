import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { CreditsService } from '../credits/credits.service';
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
      providers: [
        BoardsService,
        { provide: getRepositoryToken(User), useValue: getMockedRepository() },
        { provide: getRepositoryToken(Board), useValue: getMockedRepository() },
        {
          provide: getRepositoryToken(Credit),
          useValue: getMockedRepository(),
        },
        {
          provide: getRepositoryToken(BoardColumn),
          useValue: getMockedRepository(),
        },
        { provide: getRepositoryToken(Card), useValue: getMockedRepository() },
        {
          provide: CreditsService,
          useValue: {},
        },
      ],
      imports: [EventEmitterModule.forRoot()],
    }).compile();

    controller = module.get<BoardsController>(BoardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
