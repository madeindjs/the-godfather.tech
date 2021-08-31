import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { BoardsModule } from '../src/boards/boards.module';
import { BoardColumn } from '../src/boards/entities/board-column.entity';
import { Board } from '../src/boards/entities/board.entity';
import { Card } from '../src/boards/entities/card.entity';
import { Credit } from '../src/credits/entities/credit.entity';
import { HashModule } from '../src/hash/hash.module';
import { User } from '../src/users/entities/user.entity';
import { UsersModule } from '../src/users/users.module';
import { getTypeOrmModule } from './type-orm-module-options';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      envFilePath: '.test.env',
    }),
    getTypeOrmModule([User, Credit, Board, BoardColumn, Card]),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: getTypeOrmOptionsFactory(),
    // }),
    UsersModule,
    HashModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class TestAppModule {}
