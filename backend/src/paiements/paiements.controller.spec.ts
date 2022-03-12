import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { UsersService } from '../users/users.service';
import { Paiement } from './entities/paiement.entity';
import { PaiementsController } from './paiements.controller';
import { PaiementsService } from './paiements.service';

describe('PaiementsController', () => {
  let controller: PaiementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaiementsController],
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

    controller = module.get<PaiementsController>(PaiementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
