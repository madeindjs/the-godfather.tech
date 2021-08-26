import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { Website } from './entities/website.entity';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
  ) {}

  create(createWebsiteDto: CreateWebsiteDto) {
    return this.websiteRepository.save(createWebsiteDto);
  }

  findAll(user: User) {
    return this.websiteRepository.find({ user });
  }

  findOne(id: number) {
    return this.websiteRepository.findOne({ id });
  }

  findOneBy(field: keyof Website, value: string) {
    return this.websiteRepository.findOne({ [field]: value });
  }

  remove(id: number) {
    return this.websiteRepository.delete({ id });
  }
}
