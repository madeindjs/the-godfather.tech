import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../hash/hash.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { GetAccessTokenDto } from './auth.dto';
import { JwtPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: GetAccessTokenDto): Promise<User | undefined> {
    const user = await this.usersService.findOneByEmail(email);

    if (user === undefined) {
      return undefined;
    }

    if (this.hashService.hashString(password) !== user.passwordHashed) {
      this.logger.debug('password mismatch');
      return undefined;
    }

    return user;
  }

  async getToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }
}
