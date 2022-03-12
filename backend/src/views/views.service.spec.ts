import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { CampaignsService } from '../campaigns/campaigns.service';
import { GithubService } from '../github/github.service';
import { View } from './entities/view.entity';
import { ViewsService } from './views.service';

describe('ViewsService', () => {
  let service: ViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewsService,
        { provide: getRepositoryToken(View), useValue: getMockedRepository() },
        { provide: GithubService, useValue: {} },
        { provide: CampaignsService, useValue: {} },
      ],
    }).compile();

    service = module.get<ViewsService>(ViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
