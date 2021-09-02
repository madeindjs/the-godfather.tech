import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { getMockedRepository } from '../../test/mocks/repository.mock';
import { HashModule } from '../hash/hash.module';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        { provide: UsersService, useValue: getMockedRepository() },
        { provide: getRepositoryToken(User), useValue: getMockedRepository() },
      ],
      imports: [
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
      user.id = randomUUID();
      user.email = 'toto@toto.fr';
      expect(await service.getToken(user)).toBeTruthy();
    });
  });
});
