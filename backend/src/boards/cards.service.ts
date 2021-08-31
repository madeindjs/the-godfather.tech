import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Board } from './entities/board.entity';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  create({ name, boardId }: CreateCardDto) {
    return this.cardRepository.save({ boardId, name });
  }

  update(card: UpdateCardDto) {
    return this.cardRepository.save(card);
  }

  findAll(board: Board) {
    return this.cardRepository.find({ board });
  }

  findOne(id: string) {
    return this.cardRepository.findOne({ id });
  }

  findOneBy(field: keyof Board, value: string) {
    return this.cardRepository.findOne({ [field]: value });
  }

  remove(id: string) {
    return this.cardRepository.delete({ id });
  }
}
