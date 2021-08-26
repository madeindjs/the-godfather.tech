import { BullModule, getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from '../../test/type-orm-module-options';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { PasswordResetService } from './password-reset.service';

describe('PasswordResetService', () => {
  let service: PasswordResetService;
  const exampleQueueMock = { add: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot(getTypeOrmOptions([User])),
        BullModule.registerQueue({ name: 'github' }),
      ],
      providers: [PasswordResetService],
    })
      .overrideProvider(getQueueToken('github'))
      .useValue(exampleQueueMock)
      .compile();

    service = module.get<PasswordResetService>(PasswordResetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
