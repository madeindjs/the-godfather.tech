// src/users/users.service.spec.ts
import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from '../../test/type-orm-module-options';
import { GithubModule } from '../github/github.module';
import { HashModule } from '../hash/hash.module';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const exampleQueueMock = { add: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HashModule,
        GithubModule,
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot(getTypeOrmOptions([User])),
        BullModule.registerQueue({ name: 'github' }),
      ],
      providers: [UsersService],
    })
      .overrideProvider(getQueueToken('github'))
      .useValue(exampleQueueMock)
      .compile();

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should insert job', async () => {
      await service.create({
        email: `${Date.now()}@user-service.test`,
        password: '123456',
      });
      expect(exampleQueueMock.add).toBeCalledTimes(1);
    });
  });
});
