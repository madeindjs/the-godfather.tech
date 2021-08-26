import { Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GithubService } from '../github/github.service';
import { UsersService } from '../users/users.service';
import { GithubUserSearchJob } from './interfaces/github.interface';

@Injectable()
@Processor('github')
export class GithubConsumer {
  private readonly logger = new Logger(GithubConsumer.name);

  constructor(
    private readonly githubService: GithubService,
    private readonly usersService: UsersService,
  ) {}

  @Process()
  async process(job: Job<GithubUserSearchJob>) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(
        job.data,
      )}...`,
    );

    const email = job.data.email;

    const githubUser = await this.githubService.findUserByEmail(email);

    if (githubUser === undefined) {
      this.logger.warn(`cannot get user information for ${email}`);
      return;
    }

    const user = await this.usersService.findOneByEmail(email);

    await this.usersService.update(user.id, {
      metadata: { github: githubUser },
    });
  }
}
