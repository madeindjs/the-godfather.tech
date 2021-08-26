import { IsEmail, IsString, MinLength } from 'class-validator';

export class GetAccessTokenDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
