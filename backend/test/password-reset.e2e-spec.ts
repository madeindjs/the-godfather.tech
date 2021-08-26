import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PasswordResetModule } from '../src/password-reset/password-reset.module';
import { PasswordResetService } from '../src/password-reset/password-reset.service';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { TestAppModule } from './testApp.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userService: UsersService;
  let passwordResetService: PasswordResetService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, TestAppModule, PasswordResetModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    userService = moduleFixture.get(UsersService);
    passwordResetService = moduleFixture.get(PasswordResetService);
  });

  describe('/:id (POST)', () => {
    it('should generate token', async () => {
      const userBefore = await userService.create({
        email: `create-password-reset-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });

      expect(userBefore.resetPasswordToken).toBeNull();

      await request(app.getHttpServer())
        .post(`/password-reset/`)
        .send({ email: userBefore.email })
        .expect(201);

      const userAfter = await userService.findOneByEmail(userBefore.email);
      expect(userAfter.resetPasswordToken).not.toBeNull();
    });
  });

  describe('/:id (PATCH)', () => {
    it('should use token', async () => {
      const userBefore = await userService.create({
        email: `update-password-reset-${new Date().getTime()}@test.fr`,
        password: 'tototo',
      });
      await passwordResetService.reset(userBefore);

      await request(app.getHttpServer())
        .patch(`/password-reset/${userBefore.resetPasswordToken}`)
        .send({ password: userBefore.email })
        .expect(200);

      const userAfter = await userService.findOneByEmail(userBefore.email);

      expect(userAfter.passwordHashed).not.toEqual(userBefore.passwordHashed);
      expect(userAfter.resetPasswordToken).toBeNull();
    });
  });
});
