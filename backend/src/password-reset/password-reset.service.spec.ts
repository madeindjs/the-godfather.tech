import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetService', () => {
  let service: PasswordResetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordResetService,
        {
          provide: UsersService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PasswordResetService>(PasswordResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
