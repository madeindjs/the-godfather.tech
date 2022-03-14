import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { PaiementsService } from '../paiements/paiements.service';
import { View } from '../views/entities/view.entity';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';

describe('CampaignsService', () => {
  let service: CampaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignsService,
        {
          provide: getRepositoryToken(Campaign),
          useValue: getMockedRepository(),
        },
        {
          provide: getRepositoryToken(View),
          useValue: getMockedRepository(),
        },
        {
          provide: PaiementsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CampaignsService>(CampaignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
