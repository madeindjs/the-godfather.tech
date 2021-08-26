import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmOptions } from '../../test/type-orm-module-options';
import { User } from '../users/entities/user.entity';
import { CreditsService } from './credits.service';
import { Credit } from './entities/credit.entity';

describe('CreditsService', () => {
  let service: CreditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditsService],
      imports: [
        TypeOrmModule.forFeature([Credit]),
        TypeOrmModule.forRoot(getTypeOrmOptions([Credit, User])),
      ],
    }).compile();

    service = module.get<CreditsService>(CreditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
