import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { GithubInformationFull } from '../github/github.interface';
import { PaiementsService } from '../paiements/paiements.service';
import { User } from '../users/entities/user.entity';
import { getPriceForStars } from '../utils/price.utils';
import { View } from '../views/entities/view.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Injectable()
export class CampaignsService {
  private readonly logger = new Logger(CampaignsService.name);

  constructor(
    @InjectRepository(Campaign)
    private readonly campaignsRepository: Repository<Campaign>,
    @InjectRepository(View)
    private readonly viewsRepository: Repository<View>,
    private readonly paiementsService: PaiementsService,
  ) {}

  async create(createCampaignDto: CreateCampaignDto, user: User) {
    const intent = await this.paiementsService.createIntent({
      amount: createCampaignDto.totalPrice,
      user,
    });

    return this.campaignsRepository.save({
      ...createCampaignDto,
      user,
      stripePaymentIntentId: intent.id,
      stripePaymentIClientSecret: intent.client_secret,
    });
  }

  async findForGithubInformation({
    topics,
    stargazers_count: stars,
  }: GithubInformationFull): Promise<Campaign[]> {
    const price = getPriceForStars(stars);

    const query = this.campaignsRepository
      .createQueryBuilder('c')
      .where('c.deactivateAt IS NULL')
      .andWhere('c."minStars" IS NULL OR c."minStars" <= :stars', { stars })
      .andWhere('c."maxStars" IS NULL OR c."maxStars" >= :stars', { stars })
      .andWhere('c."totalPrice"::FLOAT < (c."currentPrice"::FLOAT + :price)', {
        price,
      })
      .andWhere('c."paidAt" IS NOT NULL');
    // TODO add budget per day

    if (topics.length > 0) {
      query.andWhere('c.topics && ARRAY[:...topics]', { topics });
    }

    return query.getMany();
  }

  incrementCurrentPrice(campaign: Campaign, amount: number | string) {
    campaign.currentPrice = Number(campaign.currentPrice) + Number(amount);
    return this.campaignsRepository.save(campaign);
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
      .addSelect('c."currentPrice"::FLOAT', 'currentPrice')
      .addSelect('c."totalPrice"::FLOAT', 'totalPrice')
      .addSelect('c."deactivateAt"', 'deactivateAt')
      .addSelect('c."paidAt"', 'paidAt')
      .where({ user })
      .groupBy('c.id, c.content, c.topics')
      .getRawMany();
  }

  findOne(id: string) {
    return this.campaignsRepository.findOne({ id });
  }

  async getSummary(campaign: Campaign) {
    return {
      currentPrice: await this.getCurrentPrice(campaign),
      viewsCount: await this.getViewsCount(campaign),
      viewsSummaries: await this.getViewsSummary(campaign),
      reposSummaries: await this.getReposSummary(campaign),
    };
  }

  private async getViewsSummary(campaign: Campaign) {
    return this.viewsRepository
      .createQueryBuilder('v')
      .select(`TO_CHAR(v."createdAt", 'YYYY-MM-DD')`, 'date')
      .addSelect('SUM(v.price)::FLOAT', 'totalPrice')
      .addSelect('COUNT(1)::FLOAT', 'totalViews')
      .where('v.campaignId = :id', { id: campaign.id })
      .groupBy(`TO_CHAR(v."createdAt", 'YYYY-MM-DD')`)
      .getRawMany();
  }

  private async getReposSummary(campaign: Campaign) {
    return this.viewsRepository
      .createQueryBuilder('v')
      .select(`v.repository`, 'repository')
      .addSelect('COUNT(1)::FLOAT', 'totalViews')
      .addSelect('SUM(v.price)::FLOAT', 'totalPrice')
      .where('v.campaignId = :id', { id: campaign.id })
      .groupBy(`v.repository`)
      .orderBy('COUNT(1)::FLOAT')
      .getRawMany();
  }

  private async getCurrentPrice(campaign: Campaign): Promise<number> {
    const result = await this.viewsRepository
      .createQueryBuilder('v')
      .select('SUM(v.price)::FLOAT', 'totalAmount')
      .where('v.campaignId = :id', { id: campaign.id })
      .groupBy('v."campaignId"')
      .getRawOne();

    return result?.totalAmount ?? 0;
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

  async handleWebhook(request: Request) {
    const event = this.paiementsService.extractEvent(request);

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as any;
        const campaign = await this.campaignsRepository.findOne({
          stripePaymentIntentId: paymentIntent.id,
        });

        if (!campaign) {
          const message = `Cannot find campaign for paymentIntentId=${paymentIntent.id}`;
          this.logger.error(message);
          throw new BadRequestException(message);
        }

        campaign.paidAt = new Date();
        await this.campaignsRepository.save(campaign);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        this.logger.warn(`Unhandled event type ${event.type}.`);
    }
  }
}
