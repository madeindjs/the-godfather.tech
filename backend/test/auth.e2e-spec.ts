import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { User } from '../src/users/entities/user.entity';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { TestAppModule } from './testApp.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let user: User;
  let password = 'tototo';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TestAppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const userService = moduleFixture.get(UsersService);

    user = await userService.create({
      email: `auth-${new Date().getTime()}@test.fr`,
      password,
    });
  });

  describe('/ (POST)', () => {
    it('should create', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({ email: user.email, password })
        .expect(201);
    });

    it('should not create because of password mismatch', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({ email: user.email, password: 'aaaaaaa' })
        .expect(400);
    });

    it('should not create because user not exists', () => {
      return request(app.getHttpServer())
        .post('/auth')
        .send({ email: `tata@tata.fr`, password })
        .expect(400);
    });
  });
});
