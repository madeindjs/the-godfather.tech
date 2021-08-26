import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from '../../test/type-orm-module-options';
import { User } from '../users/entities/user.entity';
import { CreditsController } from './credits.controller';
import { CreditsService } from './credits.service';
import { Credit } from './entities/credit.entity';

describe('CreditsController', () => {
  let controller: CreditsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditsController],
      providers: [CreditsService],
      imports: [
        TypeOrmModule.forFeature([Credit]),
        TypeOrmModule.forRoot(getTypeOrmOptions([Credit, User])),
      ],
    }).compile();

    controller = module.get<CreditsController>(CreditsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
