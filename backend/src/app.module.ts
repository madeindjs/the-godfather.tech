import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardsModule } from './boards/boards.module';
import { Board } from './boards/entities/board.entity';
import { CreditsModule } from './credits/credits.module';
import { Credit } from './credits/entities/credit.entity';
import { HashModule } from './hash/hash.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log({
          type: 'postgres',
          port: 5432,
          host: configService.get('DATABASE_HOST'),
          database: configService.get('DATABASE_DB'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          entities: [User, Board, Credit],
          synchronize: true,
          logging: true,
        });

        return {
          type: 'postgres',
          port: 5432,
          host: configService.get('DATABASE_HOST'),
          database: configService.get('DATABASE_DB'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          entities: [User, Board, Credit],
          synchronize: true,
          logging: true,
        };
      },
    }),
    UsersModule,
    HashModule,
    AuthModule,
    PasswordResetModule,
    BoardsModule,
    CreditsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
