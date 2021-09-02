import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetController', () => {
  let controller: PasswordResetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordResetService,
        {
          provide: UsersService,
          useValue: {},
        },
      ],
      controllers: [PasswordResetController],
    }).compile();

    controller = module.get<PasswordResetController>(PasswordResetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
