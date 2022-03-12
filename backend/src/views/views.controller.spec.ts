import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { CampaignsService } from '../campaigns/campaigns.service';
import { GithubService } from '../github/github.service';
import { View } from './entities/view.entity';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';

describe('ViewsController', () => {
  let controller: ViewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ViewsController],
      providers: [
        ViewsService,
        { provide: getRepositoryToken(View), useValue: getMockedRepository() },
        { provide: GithubService, useValue: {} },
        { provide: CampaignsService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ViewsController>(ViewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
