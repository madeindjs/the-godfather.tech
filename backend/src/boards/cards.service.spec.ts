import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { EventEmitter2 } from 'eventemitter2';
import {
  getMockedRepository,
  MockedRepository,
} from '../../test/mocks/repository.mock';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './entities/card.entity';
import { createCardEventName } from './events';

describe('CardsService', () => {
  let service: CardsService;
  let eventEmitter: { emit: jest.Mock };
  let cardRepository: MockedRepository;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: EventEmitter2,
          useValue: {
            emit: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Card),
          useValue: getMockedRepository(),
        },
      ],
    }).compile();

    service = testingModule.get(CardsService);

    cardRepository = testingModule.get(getRepositoryToken(Card));
    eventEmitter = testingModule.get(EventEmitter2);
  });

  describe('create', () => {
    it('should create board with columns', async () => {
      const dto = new CreateCardDto();
      dto.name = 'test';
      dto.boardId = randomUUID();

      const card = { ...dto, id: randomUUID() };

      cardRepository.save.mockResolvedValue(card);

      await service.create(dto);

      expect(cardRepository.save).toBeCalledTimes(1);
      expect(eventEmitter.emit).toBeCalledWith(createCardEventName, { card });
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
