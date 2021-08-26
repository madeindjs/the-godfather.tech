import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from '../../test/type-orm-module-options';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetController', () => {
  let controller: PasswordResetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot(getTypeOrmOptions([User])),
      ],
      providers: [PasswordResetService],
      controllers: [PasswordResetController],
    }).compile();

    controller = module.get<PasswordResetController>(PasswordResetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
