import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../test/type-orm-module-options';
import { HashModule } from '../hash/hash.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, UsersService],
      imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({ envFilePath: '.test.env' }),
        getTypeOrmModule([User]),
        UsersModule,
        HashModule,
        JwtModule.register({
          secret: 'test',
        }),
      ],
    }).compile();

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
