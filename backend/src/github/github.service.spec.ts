import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';

describe.only('GithubService', () => {
  let service: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubService],
    }).compile();

    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserByEmail', () => {
    // TODO mock HTTP
    it.skip('should get me', async () => {
      const user = await service.findUserByEmail(
        'contact@rousseau-alexandre.Fr',
      );

      expect(user.login).toEqual('madeindjs');
    });
  });
});
