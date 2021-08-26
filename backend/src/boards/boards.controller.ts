import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreditsGuard } from '../credits/credits.guard';
import { CreditsService } from '../credits/credits.service';
import { User } from '../users/entities/user.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
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
    const existingBoard = await this.boardsService.findOneBy(
      'url',
      createBoardDto.url,
    );

    if (existingBoard !== undefined) {
      throw new BadRequestException({ url: 'already exists' });
    }

    createBoardDto.user = req.user;
    const { id, url } = await this.boardsService.create(createBoardDto);

    await this.creditsService.createFromRequest(req, req.user);

    return { id, url };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: Request & { user: User }) {
    return this.boardsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req: Request & { user: User }, @Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req: Request & { user: User }, @Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
