import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { BoardColumn } from './entities/board-column.entity';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardColumnsService {
  constructor(
    @InjectRepository(BoardColumn)
    private readonly boardColumnRepository: Repository<BoardColumn>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  create({ name, boardId }: CreateBoardColumnDto) {
    return this.boardColumnRepository.save({ boardId, name });
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
