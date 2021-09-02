import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { User } from '../users/entities/user.entity';
import { CreditsService } from './credits.service';
import { Credit } from './entities/credit.entity';

describe('CreditsService', () => {
  let service: CreditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditsService,
        {
          provide: getRepositoryToken(User),
          useValue: getMockedRepository(),
        },
        {
          provide: getRepositoryToken(Credit),
          useValue: getMockedRepository(),
        },
      ],
    }).compile();

    service = module.get<CreditsService>(CreditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
