import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PaiementsController } from './paiements.controller';
import { PaiementsService } from './paiements.service';

describe('PaiementsController', () => {
  let controller: PaiementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaiementsController],
      providers: [PaiementsService],
      imports: [
        ConfigModule.forRoot({
          cache: true,
        }),
      ],
    }).compile();

    controller = module.get<PaiementsController>(PaiementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
