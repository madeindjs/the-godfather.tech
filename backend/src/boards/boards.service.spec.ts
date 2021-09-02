import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { User } from 'src/users/entities/user.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardColumn } from './entities/board-column.entity';
import { Board } from './entities/board.entity';
import { Card } from './entities/card.entity';

interface MockedRepository {
  findOneOrFail: jest.Mock;
  findOne: jest.Mock;
  save: jest.Mock;
  delete: jest.Mock;
}

function getMockedRepository(): MockedRepository {
  return {
    findOneOrFail: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };
}

describe('BoardService', () => {
  let service: BoardsService;

  let boardColumnRepository: MockedRepository;
  let boardRepository: MockedRepository;
  let cardRepository: MockedRepository;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        BoardsService,
        {
          provide: getRepositoryToken(BoardColumn),
          useValue: getMockedRepository(),
        },
        {
          provide: getRepositoryToken(Board),
          useValue: getMockedRepository(),
        },
        {
          provide: getRepositoryToken(Card),
          useValue: getMockedRepository(),
        },
      ],
    }).compile();

    service = testingModule.get<BoardsService>(BoardsService);

    boardColumnRepository = testingModule.get(getRepositoryToken(BoardColumn));
    boardRepository = testingModule.get(getRepositoryToken(Board));
    cardRepository = testingModule.get(getRepositoryToken(Card));
  });

  describe('create', () => {
    it('should create board with columns', async () => {
      const dto = new CreateBoardDto();
      dto.name = 'test';
      dto.user = { email: 'test@test.fr' } as User;

      const boardId = randomUUID();
      boardRepository.save.mockResolvedValue({ ...dto, id: boardId } as Board);

      await service.create(dto);

      expect(boardRepository.save).toBeCalledTimes(1);
      expect(boardColumnRepository.save).toBeCalledWith([
        { boardId, name: 'Doing' },
        { boardId, name: 'Done' },
      ]);
      expect(boardRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove board with columns and cards', async () => {
      const boardId = randomUUID();

      await service.remove(boardId);

      expect(cardRepository.delete).toBeCalledWith({ boardId });
      expect(boardColumnRepository.delete).toBeCalledWith({ boardId });
      expect(boardRepository.delete).toBeCalledWith({ id: boardId });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
