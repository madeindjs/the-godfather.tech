import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOneByEmail(
      createUserDto.email,
    );

    if (existingUser !== undefined) {
      throw new BadRequestException({ email: 'already exists' });
    }

    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();

    return users.map(({ email, id }) => ({ email, id }));
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: Request & { user: User }) {
    return req.user.toPublicObject();
  }

  @Post('me/fetch-again')
  @UseGuards(JwtAuthGuard)
  updateMetadata(@Request() req: Request & { user: User }) {
    return this.usersService.setBackgroundJobs(req.user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @Request() req: Request & { user: User },
  ) {
    const user = await this.usersService.findOne(+id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    if (req.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return user.toPublicObject();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,

    @Request() req: Request & { user: User },
  ) {
    const user = await this.ensureUserExists(id);

    if (req.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Request() req: Request & { user: User },
  ) {
    const user = await this.ensureUserExists(id);

    if (req.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    await this.usersService.remove(+id);
  }

  private async ensureUserExists(id: string) {
    const user = await this.usersService.findOne(+id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }
}
