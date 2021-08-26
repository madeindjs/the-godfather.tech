import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HashModule } from '../hash/hash.module';
import { UsersModule } from '../users/users.module';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [HashModule, AuthModule, UsersModule],
  providers: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class PasswordResetModule {}
