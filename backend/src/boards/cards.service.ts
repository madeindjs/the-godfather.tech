import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Board } from './entities/board.entity';
import { Card } from './entities/card.entity';
import {
  CreatCardEvent,
  createCardEventName,
  RemoveCardEvent,
  removeCardEventName,
  UpdateCardEvent,
  updateCardEventName,
} from './events';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(cardDto: CreateCardDto) {
    cardDto.name ??= 'New Card';

    const card = await this.cardRepository.save(cardDto);

    this.eventEmitter.emit(createCardEventName, { card } as CreatCardEvent);

    return card;
  }

  async update(cardDto: UpdateCardDto) {
    const card = this.cardRepository.save(cardDto);
    this.eventEmitter.emit(updateCardEventName, {
      card: cardDto,
    } as UpdateCardEvent);
    return card;
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

  async remove(id: string) {
    const card = await this.findOne(id);
    this.eventEmitter.emit(removeCardEventName, { card } as RemoveCardEvent);
    return this.cardRepository.delete(card);
  }
}
