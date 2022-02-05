import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: Request & { user: User }) {
    return req.user;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @Request() req: Request & { user: User },
  ) {
    const user = await this.usersService.findOne(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    if (req.user.id !== user.id) {
      throw new UnauthorizedException();
    }

    return user;
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

    return this.usersService.update(id, updateUserDto);
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

    await this.usersService.remove(id);
  }

  private async ensureUserExists(id: string) {
    const user = await this.usersService.findOne(id);

    if (user === undefined) {
      throw new NotFoundException();
    }

    return user;
  }
}
