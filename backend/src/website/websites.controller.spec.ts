import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from '../../test/type-orm-module-options';
import { CreditsModule } from '../credits/credits.module';
import { Credit } from '../credits/entities/credit.entity';
import { User } from '../users/entities/user.entity';
import { Website } from './entities/website.entity';
import { WebsitesController } from './websites.controller';
import { WebsitesService } from './websites.service';

describe('WebsitesController', () => {
  let controller: WebsitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebsitesController],
      providers: [WebsitesService],
      imports: [
        CreditsModule,
        TypeOrmModule.forFeature([Website, Credit]),
        TypeOrmModule.forRoot(getTypeOrmOptions([Website, User, Credit])),
      ],
    }).compile();

    controller = module.get<WebsitesController>(WebsitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
