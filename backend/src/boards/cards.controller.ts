import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('/api/v1/cards')
export class CardsController {
  constructor(
    private readonly cardsService: CardsService,
    private readonly boardsService: BoardsService,
  ) {}

  @Post()
  create(@Body() createBoardDto: CreateCardDto) {
    return this.cardsService.create(createBoardDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateCardDto) {
    const card = await this.cardsService.findOne(id);

    if (card === undefined) {
      throw new NotFoundException();
    }
    return this.cardsService.update(updateBoardDto);
  }

  // @Get()
  // findAll(@Request() req: Request & { user: User }) {
  //   return this.cardsService.findAll(req.user);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const card = await this.cardsService.findOne(id);

    if (card === undefined) {
      throw new NotFoundException();
    }

    return this.cardsService.remove(id);
  }
}
