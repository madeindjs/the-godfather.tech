import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { User } from '../src/users/entities/user.entity';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { TestAppModule } from './testApp.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  let userService: UsersService;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TestAppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userService = moduleFixture.get(UsersService);
    authService = moduleFixture.get(AuthService);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });

  describe('/ (POST)', () => {
    it('should create', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: `test@test-${new Date().getTime()}.fr`,
          password: 'tototo',
        })
        .expect(201);
    });

    it('should not create because user already exists', async () => {
      const { email } = await userService.create({
        email: `get-user-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });

      await request(app.getHttpServer())
        .post('/users')
        .send({ email, password: '123456' })
        .expect(400);
    });

    it('should not create because missing password', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ email: 'test@test.fr' })
        .expect(400);
    });
  });

  describe('/:id (GET)', () => {
    let user: User;
    let otherUser: User;
    let token: string;

    beforeAll(async () => {
      user = await userService.create({
        email: `get-user-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });
      otherUser = await userService.create({
        email: `get-user-${new Date().getTime()}@other.fr`,
        password: 'tototo',
      });
      token = await authService.getToken(user);
    });

    it('should get user', () => {
      return request(app.getHttpServer())
        .get(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should get 401', () => {
      return request(app.getHttpServer())
        .get(`/users/${otherUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(401);
    });
  });

  describe('/:id (PATCH)', () => {
    let user: User;
    let otherUser: User;
    let token: string;

    beforeAll(async () => {
      user = await userService.create({
        email: `update-user-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });
      otherUser = await userService.create({
        email: `update-user-${new Date().getTime()}@other.fr`,
        password: 'tototo',
      });
      token = await authService.getToken(user);
    });

    it('should update user', async () => {
      await request(app.getHttpServer())
        .patch(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ password: 'tatata' })
        .expect(200);

      const userUpdated = await userService.findOne(user.id);

      expect(userUpdated.passwordHashed).not.toEqual(user.passwordHashed);
    });

    it('should get 404', () => {
      return request(app.getHttpServer())
        .patch(`/users/${otherUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ password: 'tatata' })
        .expect(401);
    });
  });

  describe('/:id (DELETE)', () => {
    let user: User;
    let otherUser: User;
    let token: string;

    beforeAll(async () => {
      user = await userService.create({
        email: `update-user-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });
      otherUser = await userService.create({
        email: `update-user-${new Date().getTime()}@other.fr`,
        password: 'tototo',
      });
      token = await authService.getToken(user);
    });

    it('should delete user', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const userDeleted = await userService.findOne(user.id);
      expect(userDeleted).toBeUndefined();
    });

    it('should get 401', () => {
      return request(app.getHttpServer())
        .delete(`/users/${otherUser.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(401);
    });
  });
});
