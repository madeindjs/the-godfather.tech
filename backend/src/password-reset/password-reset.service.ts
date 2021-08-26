import { Injectable, Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

function buildResetUrl(token: string, host: string = 'localhost:3000'): string {
  return [host, 'password-reset', token].join('/');
}

@Injectable()
export class PasswordResetService {
  private readonly logger = new Logger(PasswordResetService.name);

  constructor(private readonly usersService: UsersService) {}

  async reset(user: User): Promise<void> {
    user.resetPasswordToken = uuid();
    await this.usersService.update(user.id, {
      resetPasswordToken: user.resetPasswordToken,
    });
    this.sendEmail(user);
  }

  private sendEmail(user: User) {
    const url = buildResetUrl(user.resetPasswordToken);
    // TODO send email for real
    this.logger.log(`send reset URL to ${user.email}: ${url}`);
  }
}
