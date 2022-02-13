import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { View } from '../views/entities/view.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignsRepository: Repository<Campaign>,
    @InjectRepository(View)
    private readonly viewsRepository: Repository<View>,
  ) {}

  create(createCampaignDto: CreateCampaignDto, user: User) {
    return this.campaignsRepository.save({ ...createCampaignDto, user });
  }

  findForTopics(topics: string[]) {
    if (topics.length === 0) {
      return this.campaignsRepository.find({});
    }
    return this.campaignsRepository
      .createQueryBuilder('c')
      .where('c.topics && ARRAY[:...topics]', { topics })
      .andWhere('c.deactivateAt IS NULL')
      .getMany();
  }

  findAllForUser(user: User) {
    return this.campaignsRepository.find({ user });
  }

  findAllSummaryForUser(user: User) {
    return this.campaignsRepository
      .createQueryBuilder('c')
      .leftJoin('c.views', 'v')
      .select('c.id', 'id')
      .addSelect('c.content', 'content')
      .addSelect('c.topics', 'topics')
      .addSelect('COUNT(v.id)::INTEGER', 'viewsCount')
      .addSelect('c."amountPerDay"::FLOAT', 'amountPerDay')
      .addSelect('SUM(v.price)::FLOAT', 'totalAmount')
      .addSelect('c."deactivateAt"', 'deactivateAt')
      .where({ user })
      .groupBy('c.id, c.content, c.topics')
      .getRawMany();
  }

  findOne(id: string) {
    return this.campaignsRepository.findOne({ id });
  }

  async getSummary(campaign: Campaign) {
    return {
      totalAmount: await this.getTotalAmount(campaign),
      viewsCount: await this.getViewsCount(campaign),
      viewsSummary: await this.getViewsSummary(campaign),
    };
  }

  private async getViewsSummary(campaign: Campaign) {
    return this.viewsRepository
      .createQueryBuilder('v')
      .select(`TO_CHAR(v."createdAt", 'YYYY-MM-DD')`, 'date')
      .addSelect('SUM(v.price)::FLOAT', 'totalAmount')
      .addSelect('COUNT(1)::FLOAT', 'totalViews')
      .where('v.campaignId = :id', { id: campaign.id })
      .groupBy(`TO_CHAR(v."createdAt", 'YYYY-MM-DD')`)
      .getRawMany();
  }

  private async getTotalAmount(campaign: Campaign): Promise<number> {
    const { totalAmount } = await this.viewsRepository
      .createQueryBuilder('v')
      .select('SUM(v.price)::FLOAT', 'totalAmount')
      .where('v.campaignId = :id', { id: campaign.id })
      .groupBy('v."campaignId"')
      .getRawOne();

    return totalAmount;
  }

  private getViewsCount(campaign: Campaign): Promise<number> {
    return this.viewsRepository.count({ campaign });
  }

  toggleActivate(campaign: Campaign) {
    if (campaign.deactivateAt) {
      campaign.deactivateAt = null;
    } else {
      campaign.deactivateAt = new Date();
    }

    return this.campaignsRepository.save(campaign);
  }

  remove(id: string) {
    return this.campaignsRepository.delete({ id });
  }
}
