import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { GithubService } from './github.service';

@Controller('/api/v1/github')
export class GithubController {
  private readonly logger = new Logger(GithubController.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('auth')
  async auth(@Body() { code }: AuthDto) {
    const githubToken = await this.githubService
      .exchangeCode(code)
      .catch((e) => {
        this.logger.error(e);
        return undefined;
      });

    if (githubToken === undefined) {
      throw new UnauthorizedException(['Github Token is not valid']);
    }

    const githubInformation = await this.githubService
      .getUserFromToken(githubToken)
      .catch(() => undefined);

    if (githubInformation === undefined) {
      throw new UnauthorizedException(['Cannot get user informations']);
    }

    const email = githubInformation.email;

    if (!email) {
      throw new BadRequestException([
        'Cannot retrieve associated email to this account. Please make sure that you set a public email (https://github.com/settings/profile).',
      ]);
    }

    let user = await this.usersService.findOneByEmail(email);

    if (user === undefined) {
      user = await this.usersService.create({
        email,
        githubInformation,
      });
    }

    const token = await this.authService.getToken(user);

    return { token, user };
  }
}
