import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { GithubService } from './github.service';

@Controller('/api/v1/github')
export class GithubController {
  constructor(
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Post('auth')
  async auth(@Body() { code }: AuthDto) {
    const githubToken = await this.githubService.exchangeCode(code);
    const githubInformation = await this.githubService.getUserFromToken(
      githubToken,
    );
    const email = githubInformation.email;

    let user = await this.usersService.findOneByEmail(email);

    if (user === undefined) {
      user = await this.usersService.create({
        email: githubInformation.email,
        githubInformation,
      });
    }

    const token = await this.authService.getToken(user);

    // TODO create user without password

    return { token, user };
  }
}
