import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
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
      ],
    }).compile();

    controller = module.get<CampaignsController>(CampaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
