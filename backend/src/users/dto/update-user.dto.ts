import { IsObject, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  resetPasswordToken?: string;

  @IsObject()
  @IsOptional()
  metadata?: object;
}
