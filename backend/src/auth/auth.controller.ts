import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { GetAccessTokenDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async login(@Body() body: GetAccessTokenDto) {
    const user = await this.authService.validateUser(body);

    if (user === undefined) {
      throw new BadRequestException('cannot get token');
    }

    const token = await this.authService.getToken(user);

    return { access_token: token, user };
  }
}
