import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashModule } from '../hash/hash.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    HashModule,
    TypeOrmModule.forFeature([User]),
    BullModule.registerQueue({ name: 'github' }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
