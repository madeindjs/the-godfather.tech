import { Injectable, Logger } from '@nestjs/common';
import { default as axios } from 'axios';
import { GithubUserResponse } from './github.interface';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);

  /**
   * @see https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-users
   */
  async findUserByEmail(email: string) {
    const baseUrl = 'https://api.github.com/search/users';

    const params = new URLSearchParams();
    params.append('q', `${email} in:email`);

    const url = `${baseUrl}?${params.toString()}`;

    this.logger.debug(`Send GET ${url}`);

    const response = await axios.get(url);

    const items: GithubUserResponse[] | undefined = response.data?.items;

    if (items === undefined || items.length === 0) {
      return undefined;
    }

    return items.pop();
  }
}
