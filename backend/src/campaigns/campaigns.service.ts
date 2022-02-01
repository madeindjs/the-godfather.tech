import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
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

  findAllForUser(user: User) {
    return this.campaignRepository.find({ user });
  }

  findOne(id: string) {
    return this.campaignRepository.findOne({ id });
  }

  update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  remove(id: string) {
    return `This action removes a #${id} campaign`;
  }
}
