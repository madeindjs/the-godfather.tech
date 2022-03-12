import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsService } from '../campaigns/campaigns.service';
import { GithubService } from '../github/github.service';
import { ViewsService } from '../views/views.service';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';

describe('BadgeController', () => {
  let controller: BadgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BadgeController],
      providers: [
        BadgeService,
        { provide: GithubService, useValue: {} },
        { provide: CampaignsService, useValue: {} },
        { provide: ViewsService, useValue: {} },
      ],
    }).compile();

    controller = module.get<BadgeController>(BadgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
