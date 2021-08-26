import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { BoardsModule } from '../src/boards/boards.module';
import { BoardsService } from '../src/boards/boards.service';
import { Board } from '../src/boards/entities/board.entity';
import { CreditsModule } from '../src/credits/credits.module';
import { CreditsService } from '../src/credits/credits.service';
import { User } from '../src/users/entities/user.entity';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { TestAppModule } from './testApp.module';

describe('BoardController (e2e)', () => {
  let app: INestApplication;
  let boardsService: BoardsService;

  let user: User;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TestAppModule,
        AuthModule,
        BoardsModule,
        CreditsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    boardsService = moduleFixture.get(BoardsService);
    const userService = moduleFixture.get(UsersService);
    const authService = moduleFixture.get(AuthService);
    const creditsService = moduleFixture.get(CreditsService);

    user = await userService.create({
      email: `board-${new Date().getTime()}@test.fr`,
      password: 'tototo',
    });
    token = await authService.getToken(user);
    await creditsService.addToUser(user, 100);
  });

  describe('/ GET', () => {
    it('should get board', () => {
      return request(app.getHttpServer())
        .get('/boards')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should get 401', () => {
      return request(app.getHttpServer()).get('/boards').expect(401);
    });
  });

  describe('/ (POST)', () => {
    it('should create', () => {
      return request(app.getHttpServer())
        .post('/boards')
        .set('Authorization', `Bearer ${token}`)
        .send({
          url: `www.${new Date().getTime()}.fr`,
        })
        .expect(201);
    });

    it('should not create because board already exists', async () => {
      const { url } = await boardsService.create({
        url: `www.${new Date().getTime()}.fr`,
        user,
      });

      await request(app.getHttpServer())
        .post('/boards')
        .set('Authorization', `Bearer ${token}`)
        .send({ url })
        .expect(400);
    });

    it('should not create because missing tokenn', () => {
      return request(app.getHttpServer())
        .post('/boards')
        .send({
          url: `www.${new Date().getTime()}.fr`,
        })
        .expect(401);
    });
  });

  describe('/:id (GET)', () => {
    let board: Board;

    beforeAll(async () => {
      board = await boardsService.create({
        url: `www.${new Date().getTime()}.fr`,
        user,
      });
    });

    it('should get board', () => {
      return request(app.getHttpServer())
        .get(`/boards/${board.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('/:id (DELETE)', () => {
    let board: Board;

    beforeAll(async () => {
      board = await boardsService.create({
        url: `www.${new Date().getTime()}.fr`,
        user,
      });
    });

    it('should delete board', async () => {
      await request(app.getHttpServer())
        .delete(`/boards/${board.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const boardDeleted = await boardsService.findOne(board.id);
      expect(boardDeleted).toBeUndefined();
    });
  });
});
