import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller('/api/v1/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config')
  getConfig() {
    return [
      'STRIPE_CLIENT_ID',
      'GITHUB_CLIENT_ID',
      'GITHUB_CLIENT_REDIRECT_URI',
    ].reduce((acc, key) => {
      acc[key] = this.configService.get(key);
      return acc;
    }, {});
  }
}
