import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RepositoryMock } from '../../test/mocks/repository.mock';
import { HashModule } from '../hash/hash.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HashModule],
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getQueueToken('github'), useValue: { add: jest.fn() } },
        { provide: getRepositoryToken(User), useClass: RepositoryMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
