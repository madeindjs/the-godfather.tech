import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { GithubService } from '../github/github.service';
import { View } from './entities/view.entity';
import { PRICE_PER_VIEW_PER_STAR } from './views.constant';

function pick<T>(object: T, keys: (keyof T)[]) {
  return keys.reduce((acc, key) => {
    acc[key] = object[key];
    return acc;
  }, {} as any);
}

@Injectable()
export class ViewsService {
  constructor(
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>,
    private readonly githubService: GithubService,
  ) {}

  async create(repository: string, campaign: Campaign, request: Request) {
    if (await this.isRequestAlreadySeenToady(repository, request)) {
      return undefined;
    }

    return this.viewRepository.save({
      repository,
      campaign,
      price: await this.getPricePerView(repository),
      request: pick(request, [
        'headers',
        'ip',
        'cookies',
        'baseUrl',
        'params',
        'originalUrl',
      ]),
    });
  }

  /**
   * 1000 starts = 0.01€/view
   * @param repository
   * @returns
   */
  async getPricePerView(repository: string): Promise<number> {
    const { stargazers_count: stars } =
      await this.githubService.getRepositoryInformation(repository);

    return (stars || 1) * PRICE_PER_VIEW_PER_STAR;
  }

  private async isRequestAlreadySeenToady(
    repository: string,
    request: Request,
  ): Promise<boolean> {
    // TODO
    return false;
  }
}
