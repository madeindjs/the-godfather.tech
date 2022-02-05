import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  create(createCampaignDto: CreateCampaignDto, user: User) {
    return this.campaignRepository.save({ ...createCampaignDto, user });
  }

  findForTags(tags: string[]) {
    if (tags.length === 0) {
      return this.campaignRepository.find({});
    }
    return this.campaignRepository
      .createQueryBuilder('c')
      .where('c.tags && ARRAY[:...tags]', { tags })
      .andWhere('c.deactivateAt IS NULL')
      .getMany();
  }

  findAllForUser(user: User) {
    return this.campaignRepository.find({ user });
  }

  findAllSummaryForUser(user: User) {
    return this.campaignRepository
      .createQueryBuilder('c')
      .leftJoin('c.views', 'v')
      .select('c.id', 'id')
      .addSelect('c.content', 'content')
      .addSelect('c.tags', 'tags')
      .addSelect('COUNT(v.id)::INTEGER', 'viewsCount')
      .addSelect('c."amountPerDay"::FLOAT', 'amountPerDay')
      .addSelect('(c."amountPerDay" * COUNT(v.id))::FLOAT', 'totalAmount')
      .addSelect('c."deactivateAt"', 'deactivateAt')
      .where({ user })
      .groupBy('c.id, c.content, c.tags')
      .getRawMany();
  }

  findOne(id: string) {
    return this.campaignRepository.findOne({ id });
  }

  toggleActivate(campaign: Campaign) {
    if (campaign.deactivateAt) {
      campaign.deactivateAt = null;
    } else {
      campaign.deactivateAt = new Date();
    }

    return this.campaignRepository.save(campaign);
  }

  remove(id: string) {
    return this.campaignRepository.delete({ id });
  }
}
