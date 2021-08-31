import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreditsGuard } from '../credits/credits.guard';
import { CreditsService } from '../credits/credits.service';
import { User } from '../users/entities/user.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('columns')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly creditsService: CreditsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreditsGuard)
  async create(
    @Request() req: Req & { user: User },
    @Body() createBoardDto: CreateBoardDto,
  ) {
    createBoardDto.user = req.user;
    const { id } = await this.boardsService.create(createBoardDto);

    await this.creditsService.createFromRequest(req, req.user);

    return { id };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: Request & { user: User }) {
    return this.boardsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const board = await this.boardsService.findOne(id);
    if (board === undefined) {
      throw new NotFoundException();
    }
    return board;
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
