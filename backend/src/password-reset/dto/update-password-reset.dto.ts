import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordResetDto {
  @IsString()
  @MinLength(6)
  password: string;
}
