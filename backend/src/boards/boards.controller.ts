import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  Sse,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request as Req } from 'express';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreditsGuard } from '../credits/credits.guard';
import { CreditsService } from '../credits/credits.service';
import { User } from '../users/entities/user.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import {
  CreatCardEvent,
  createCardEventName,
  RemoveCardEvent,
  removeCardEventName,
  UpdateCardEvent,
  updateCardEventName,
} from './events';

@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly creditsService: CreditsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreditsGuard)
  async create(
    @Request() req: Req & { user: User },
    @Body() createBoardDto: CreateBoardDto,
  ) {
    createBoardDto.user = req.user;
    const board = await this.boardsService.create(createBoardDto);

    await this.creditsService.createFromRequest(req, req.user);

    return board;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: Request & { user: User }) {
    return this.boardsService.findAll(req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    if (board === undefined) {
      throw new NotFoundException();
    }
    return board;
  }

  @Sse(':id/sse')
  async serverSentEvent(
    @Param('id') id: string,
  ): Promise<Observable<Partial<MessageEvent<Board>>>> {
    const board = await this.boardsService.findOne(id);
    if (board === undefined) {
      throw new NotFoundException();
    }

    const board$: BehaviorSubject<Partial<MessageEvent<Board>>> =
      new BehaviorSubject({ data: board });

    this.eventEmitter.on(createCardEventName, (event: CreatCardEvent) =>
      this.onCardEvent(event, board$),
    );
    this.eventEmitter.on(updateCardEventName, (event: UpdateCardEvent) =>
      this.onCardEvent(event, board$),
    );
    this.eventEmitter.on(removeCardEventName, (event: RemoveCardEvent) =>
      this.onCardEvent(event, board$),
    );

    return board$;
  }

  private async onCardEvent(
    { card }: CreatCardEvent | UpdateCardEvent | RemoveCardEvent,
    board$: BehaviorSubject<Partial<MessageEvent<Board>>>,
  ) {
    const boardId = board$.value.data.id;

    if (card.boardId !== boardId) {
      return;
    }

    const newBoard = await this.boardsService.findOne(card.boardId);
    if (newBoard === undefined) {
      return;
    }

    board$.next({ data: newBoard });
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateBoardDto: UpdateBoardDto,
  // ) {
  //   const board = await this.boardsService.findOne(id);

  //   if (board === undefined) {
  //     throw new NotFoundException();
  //   }

  //   await this.boardsService.update(board);

  //   return board;
  // }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Request() req: Request & { user: User },
  ) {
    const board = await this.boardsService.findOne(id);

    if (board === undefined) {
      throw new NotFoundException();
    }

    if (board.user.id !== req.user.id) {
      throw new UnauthorizedException();
    }

    return this.boardsService.remove(id);
  }
}
