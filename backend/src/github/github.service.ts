import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  exchangeCode(code: string): Promise<string> {
    const params = {
      client_id: this.configService.get('GITHUB_CLIENT_ID'),
      client_secret: this.configService.get('GITHUB_CLIENT_SECRET'),
      redirect_uri: this.configService.get('GITHUB_CLIENT_REDIRECT_URI'),
      code,
    };

    return this.httpService
      .post('https://github.com/login/oauth/access_token', params, {
        headers: { Accept: 'application/json' },
      })
      .pipe(map((res) => res.data.access_token))
      .toPromise();
  }

  getUserFromToken(token: string) {
    return this.httpService
      .get('https://api.github.com/user', {
        headers: {
          Accept: 'application/json',
          Authorization: `token ${token}`,
        },
      })
      .pipe(map((res) => res.data))
      .toPromise();
  }
}
