import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly websiteRepository: Repository<Board>,
  ) {}

  create(createWebsiteDto: CreateBoardDto) {
    return this.websiteRepository.save(createWebsiteDto);
  }

  findAll(user: User) {
    return this.websiteRepository.find({ user });
  }

  findOne(id: string) {
    return this.websiteRepository.findOne({ id });
  }

  findOneBy(field: keyof Board, value: string) {
    return this.websiteRepository.findOne({ [field]: value });
  }

  remove(id: string) {
    return this.websiteRepository.delete({ id });
  }
}
