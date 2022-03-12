import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { UsersService } from '../users/users.service';
import { Paiement } from './entities/paiement.entity';
import { PaiementsService } from './paiements.service';

describe('PaiementsService', () => {
  let service: PaiementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaiementsService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Paiement),
          useValue: getMockedRepository(),
        },
      ],
      imports: [
        ConfigModule.forRoot({
          cache: true,
        }),
      ],
    }).compile();

    service = module.get<PaiementsService>(PaiementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
