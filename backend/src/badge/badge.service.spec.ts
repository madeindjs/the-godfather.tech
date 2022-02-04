import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsService } from '../campaigns/campaigns.service';
import { GithubService } from '../github/github.service';
import { BadgeService } from './badge.service';

describe('BadgeService', () => {
  let service: BadgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BadgeService,
        { provide: CampaignsService, useValue: {} },
        { provide: GithubService, useValue: {} },
      ],
    }).compile();

    service = module.get<BadgeService>(BadgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
