import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [UsersModule, AuthModule, HttpModule, ConfigModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}
