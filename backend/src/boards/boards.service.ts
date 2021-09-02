import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardColumn } from './entities/board-column.entity';
import { Board } from './entities/board.entity';
import { Card } from './entities/card.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(BoardColumn)
    private readonly boardColumnRepository: Repository<BoardColumn>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const board: Board = await this.boardRepository.save(createBoardDto);

    const todoColumn = await this.boardColumnRepository.save({
      board,
      name: 'To do',
    });

    await this.cardRepository.save({
      board,
      column: todoColumn,
      name: 'First card',
      description: 'This is you first card. You can add more card like this.',
    });

    await this.boardColumnRepository.save([
      { boardId: board.id, name: 'Doing' },
      { boardId: board.id, name: 'Done' },
    ]);

    return this.findOne(board.id);
  }

  async update({ id, user, name }: UpdateBoardDto) {
    const board = await this.boardRepository.findOneOrFail({ id, user });
    board.name = name;

    return this.boardRepository.save(board);
  }

  findAll(user: User) {
    return this.boardRepository.find({ user });
  }

  findOne(id: string) {
    return this.boardRepository.findOne({
      where: { id },
      relations: ['columns', 'cards', 'user'],
    });
  }

  findOneBy(field: keyof Board, value: string) {
    return this.boardRepository.findOne({ [field]: value });
  }

  async remove(id: string) {
    await this.cardRepository.delete({ boardId: id });
    await this.boardColumnRepository.delete({ boardId: id });
    return this.boardRepository.delete({ id });
  }
}
