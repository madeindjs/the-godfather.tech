import { IsUrl } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateBoardDto {
  @IsUrl()
  url: string;

  user: User;
}
