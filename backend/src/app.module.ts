import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BadgeModule } from './badge/badge.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { Campaign } from './campaigns/entities/campaign.entity';
import { GithubModule } from './github/github.module';
import { HashModule } from './hash/hash.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { View } from './views/entities/view.entity';
import { ViewsModule } from './views/views.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: 5432,
        host: configService.get('DATABASE_HOST'),
        database: configService.get('DATABASE_DB'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        entities: [User, Campaign, View],
        synchronize: true,
        logging: true,
      }),
    }),
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      // renderPath: '/public',
      serveStaticOptions: {
        index: 'index.html',
      },
    }),
    UsersModule,
    HashModule,
    AuthModule,
    GithubModule,
    CampaignsModule,
    BadgeModule,
    ViewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
