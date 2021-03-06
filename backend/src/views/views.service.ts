import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { CampaignsService } from '../campaigns/campaigns.service';
import { Campaign } from '../campaigns/entities/campaign.entity';
import { GithubService } from '../github/github.service';
import { getPriceForStars } from '../utils/price.utils';
import { View, ViewRequest } from './entities/view.entity';

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
    private readonly viewsRepository: Repository<View>,
    private readonly githubService: GithubService,
    private readonly campaignsService: CampaignsService,
  ) {}

  async create(repository: string, campaign: Campaign, request: Request) {
    if (!request.headers.referer?.startsWith('https://github.com')) {
      return;
    }

    if (await this.isRequestAlreadySeenToady(repository, campaign, request)) {
      return undefined;
    }

    const price = await this.getPricePerView(repository);
    await this.campaignsService.incrementCurrentPrice(campaign, price);

    return this.viewsRepository.save({
      repository,
      campaign,
      price,
      request: this.getViewRequest(request),
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

    return getPriceForStars(stars);
  }

  private async isRequestAlreadySeenToady(
    repository: string,
    campaign: Campaign,
    request: Request,
  ): Promise<boolean> {
    const count = await this.viewsRepository.count({
      repository,
      campaign,
      request: this.getViewRequest(request),
    });
    return count !== 0;
  }

  private getViewRequest(request: Request): ViewRequest {
    return pick(request, [
      'headers',
      'ip',
      'cookies',
      'baseUrl',
      'params',
      'originalUrl',
    ]);
  }

  public async getReposSummary() {
    return this.viewsRepository
      .createQueryBuilder('v')
      .select(`v.repository`, 'repository')
      .addSelect('COUNT(1)::FLOAT', 'totalViews')
      .addSelect('SUM(v.price)::FLOAT', 'totalPrice')
      .groupBy(`v.repository`)
      .orderBy('COUNT(1)::FLOAT')
      .getRawMany();
  }
}
