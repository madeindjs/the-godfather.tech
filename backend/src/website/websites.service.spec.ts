import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmModule } from '../../test/type-orm-module-options';
import { User } from '../users/entities/user.entity';
import { Website } from './entities/website.entity';
import { WebsitesService } from './websites.service';

describe('WebsiteService', () => {
  let service: WebsitesService;
  let connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsitesService],
      imports: [
        TypeOrmModule.forFeature([Website]),
        ConfigModule.forRoot({ envFilePath: '.test.env' }),
        getTypeOrmModule([Website, User]),
      ],
    }).compile();

    connection = module.get(getConnectionToken());

    service = module.get<WebsitesService>(WebsitesService);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
