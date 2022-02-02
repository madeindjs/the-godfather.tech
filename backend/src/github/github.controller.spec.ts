import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

describe('GithubController', () => {
  let controller: GithubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          cache: true,
        }),
      ],
      controllers: [GithubController],
      providers: [
        GithubService,
        { provide: UsersService, useValue: {} },
        { provide: AuthService, useValue: {} },
      ],
    }).compile();

    controller = module.get<GithubController>(GithubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
