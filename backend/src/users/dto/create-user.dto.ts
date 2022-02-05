import { IsEmail, IsObject } from 'class-validator';
import { GithubInformation } from '../../github/github.interface';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsObject()
  githubInformation: GithubInformation;
}
