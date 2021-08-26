import { Module } from '@nestjs/common';
import { GithubModule } from '../github/github.module';
import { UsersModule } from '../users/users.module';
import { GithubConsumer } from './github.consumer';

@Module({
  imports: [GithubModule, UsersModule],
  providers: [GithubConsumer],
})
export class GithubUserModule {}
