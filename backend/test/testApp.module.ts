import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { Board } from '../src/boards/entities/board.entity';
import { Credit } from '../src/credits/entities/credit.entity';
import { HashModule } from '../src/hash/hash.module';
import { User } from '../src/users/entities/user.entity';
import { UsersModule } from '../src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      envFilePath: './.test.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE_DB'),
        entities: [User, Board, Credit],
        synchronize: true,
        logging: false,
        keepConnectionAlive: true,
      }),
    }),
    UsersModule,
    HashModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class TestAppModule {}
