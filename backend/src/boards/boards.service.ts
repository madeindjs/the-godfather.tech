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
    private readonly boardRepository: Repository<Board>,
  ) {}

  create(createWebsiteDto: CreateBoardDto) {
    return this.boardRepository.save(createWebsiteDto);
  }

  update(board: Board) {
    return this.boardRepository.save(board);
  }

  findAll(user: User) {
    return this.boardRepository.find({ user });
  }

  findOne(id: string) {
    return this.boardRepository.findOne({ id });
  }

  findOneBy(field: keyof Board, value: string) {
    return this.boardRepository.findOne({ [field]: value });
  }

  remove(id: string) {
    return this.boardRepository.delete({ id });
  }
}
