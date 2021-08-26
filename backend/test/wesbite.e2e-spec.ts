import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { CreditsModule } from '../src/credits/credits.module';
import { CreditsService } from '../src/credits/credits.service';
import { User } from '../src/users/entities/user.entity';
import { UsersModule } from '../src/users/users.module';
import { UsersService } from '../src/users/users.service';
import { Website } from '../src/website/entities/website.entity';
import { WebsitesModule } from '../src/website/websites.module';
import { WebsitesService } from '../src/website/websites.service';
import { TestAppModule } from './testApp.module';

describe('WebsiteController (e2e)', () => {
  let app: INestApplication;
  let websiteService: WebsitesService;

  let user: User;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TestAppModule,
        AuthModule,
        WebsitesModule,
        CreditsModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    websiteService = moduleFixture.get(WebsitesService);
    const userService = moduleFixture.get(UsersService);
    const authService = moduleFixture.get(AuthService);
    const creditsService = moduleFixture.get(CreditsService);

    user = await userService.create({
      email: `website-${new Date().getTime()}@test.fr`,
      password: 'tototo',
    });
    token = await authService.getToken(user);
    await creditsService.addToUser(user, 100);
  });

  describe('/ GET', () => {
    it('should get website', () => {
      return request(app.getHttpServer())
        .get('/websites')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });

    it('should get 401', () => {
      return request(app.getHttpServer()).get('/websites').expect(401);
    });
  });

  describe('/ (POST)', () => {
    it('should create', () => {
      return request(app.getHttpServer())
        .post('/websites')
        .set('Authorization', `Bearer ${token}`)
        .send({
          url: `www.${new Date().getTime()}.fr`,
        })
        .expect(201);
    });

    it('should not create because website already exists', async () => {
      const { url } = await websiteService.create({
        url: `www.${new Date().getTime()}.fr`,
        user,
      });

      await request(app.getHttpServer())
        .post('/websites')
        .set('Authorization', `Bearer ${token}`)
        .send({ url })
        .expect(400);
    });

    it('should not create because missing tokenn', () => {
      return request(app.getHttpServer())
        .post('/websites')
        .send({
          url: `www.${new Date().getTime()}.fr`,
        })
        .expect(401);
    });
  });

  describe('/:id (GET)', () => {
    let website: Website;

    beforeAll(async () => {
      website = await websiteService.create({
        url: `www.${new Date().getTime()}.fr`,
        user,
      });
    });

    it('should get website', () => {
      return request(app.getHttpServer())
        .get(`/websites/${website.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    });
  });

  describe('/:id (DELETE)', () => {
    let website: Website;

    beforeAll(async () => {
      website = await websiteService.create({
        url: `www.${new Date().getTime()}.fr`,
        user,
      });
    });

    it('should delete website', async () => {
      await request(app.getHttpServer())
        .delete(`/websites/${website.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      const websiteDeleted = await websiteService.findOne(website.id);
      expect(websiteDeleted).toBeUndefined();
    });
  });
});
