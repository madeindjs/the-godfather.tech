import { IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class UpdateBoardDto {
  id: string;
  @IsString()
  name: string;
  user: User;
}
