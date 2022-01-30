import { IsEmail, IsObject } from 'class-validator';
import { GithubInformation } from '../interface/information.interface';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsObject()
  githubInformation: GithubInformation;
}
