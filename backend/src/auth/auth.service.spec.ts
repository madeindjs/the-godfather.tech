import { BullModule, getQueueToken } from '@nestjs/bull';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from '../../test/type-orm-module-options';
import { HashModule } from '../hash/hash.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const exampleQueueMock = { add: jest.fn() };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, UsersService],
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot(getTypeOrmOptions([User])),
        UsersModule,
        HashModule,
        JwtModule.register({
          secret: 'test',
        }),
        BullModule.registerQueue({ name: 'github' }),
      ],
    })
      .overrideProvider(getQueueToken('github'))
      .useValue(exampleQueueMock)
      .compile();

    service = moduleRef.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getToken', () => {
    it('should get token', async () => {
      const user = new User();
      user.id = 1;
      user.email = 'toto@toto.fr';
      expect(await service.getToken(user)).toBeTruthy();
    });
  });
});
