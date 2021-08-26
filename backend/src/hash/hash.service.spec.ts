import { Test, TestingModule } from '@nestjs/testing';
import { HashService } from './hash.service';

describe('HashService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = module.get<HashService>(HashService);
  });

  it('should hash password', () => {
    const password = 'password';
    const hash1 = service.hashString(password);
    const hash2 = service.hashString(password);
    expect(hash1).toEqual(hash2);
  });
});
