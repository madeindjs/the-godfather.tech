import { Module } from '@nestjs/common';
import { GithubService } from './github.service';

@Module({
  providers: [GithubService],
  imports: [],
  exports: [GithubService],
  controllers: [],
})
export class GithubModule {}
