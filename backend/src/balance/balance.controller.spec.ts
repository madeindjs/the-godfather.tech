import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsService } from '../campaigns/campaigns.service';
import { PaiementsService } from '../paiements/paiements.service';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';

describe('BalanceController', () => {
  let controller: BalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalanceController],
      providers: [
        BalanceService,
        {
          provide: PaiementsService,
          useValue: { findTotalForUser: jest.fn().mockResolvedValue(100) },
        },
        {
          provide: CampaignsService,
          useValue: { findTotalForUser: jest.fn().mockResolvedValue(10) },
        },
      ],
    }).compile();

    controller = module.get<BalanceController>(BalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
