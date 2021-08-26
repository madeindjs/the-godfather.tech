import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreatePasswordResetDto } from './dto/create-password-reset.dto';
import { UpdatePasswordResetDto } from './dto/update-password-reset.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async resetPassword(@Body() { email }: CreatePasswordResetDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (user === undefined) {
      // not indicate that this email does not exists
      return;
    }

    await this.passwordResetService.reset(user);
  }

  @Patch('/:token')
  async updatePassword(
    @Param('token') token: string,
    @Body() { password }: UpdatePasswordResetDto,
  ) {
    const user = await this.usersService.findOneBy('resetPasswordToken', token);

    if (user === undefined) {
      throw new BadRequestException({ token: 'is  not valid' });
    }

    await this.usersService.update(user.id, {
      password,
      resetPasswordToken: null,
    });
  }
}
