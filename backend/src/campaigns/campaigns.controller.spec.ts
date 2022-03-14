import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { PaiementsService } from '../paiements/paiements.service';
import { View } from '../views/entities/view.entity';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { Campaign } from './entities/campaign.entity';

describe('CampaignsController', () => {
  let controller: CampaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
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

    controller = module.get<CampaignsController>(CampaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
