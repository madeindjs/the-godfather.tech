import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreditsService } from '../credits/credits.service';
import { User } from '../users/entities/user.entity';
import { BoardColumnsService } from './board-columns.service';
import { BoardsService } from './boards.service';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';

@Controller('/api/v1/columns')
export class BoardColumnsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly boardColumnsService: BoardColumnsService,
    private readonly creditsService: CreditsService,
  ) {}

  @Post()
  async create(@Body() createBoardColumnDto: CreateBoardColumnDto) {
    const board = await this.boardsService.findOne(
      createBoardColumnDto.boardId,
    );

    if (!board) {
      throw new NotFoundException();
    }

    await this.boardColumnsService.create(createBoardColumnDto);

    return this.boardsService.findOne(createBoardColumnDto.boardId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: Request & { user: User }) {
    return this.boardColumnsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const board = await this.boardColumnsService.findOne(id);
    if (board === undefined) {
      throw new NotFoundException();
    }
    return board;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardColumnDto,
  ) {
    const board = await this.boardColumnsService.findOne(id);

    if (board === undefined) {
      throw new NotFoundException();
    }

    await this.boardColumnsService.update(board);

    return board;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Request() req: Request & { user: User },
  ) {
    const board = await this.boardColumnsService.findOne(id);

    if (board === undefined) {
      throw new NotFoundException();
    }

    if (board.user.id !== req.user.id) {
      throw new UnauthorizedException();
    }

    return this.boardColumnsService.remove(id);
  }
}
