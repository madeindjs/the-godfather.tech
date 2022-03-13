import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsService } from '../campaigns/campaigns.service';
import { PaiementsService } from '../paiements/paiements.service';
import { BalanceService } from './balance.service';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<BalanceService>(BalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
