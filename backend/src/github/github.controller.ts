import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { GithubService } from './github.service';

@Controller('/api/v1/github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
  ) {}
  @Post('auth')
  async auth(@Body() { code }: AuthDto) {
    const token = await this.githubService.exchangeCode(code);
    const user = await this.githubService.getUserFromToken(token);
    // TODO create user without password

    console.log({ token, user });
  }
}
