import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { View } from './entities/view.entity';
import { ViewsService } from './views.service';

describe('ViewsService', () => {
  let service: ViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViewsService,
        { provide: getRepositoryToken(View), useValue: getMockedRepository() },
      ],
    }).compile();

    service = module.get<ViewsService>(ViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
