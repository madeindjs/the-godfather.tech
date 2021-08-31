import { User } from '../../users/entities/user.entity';

export class CreateBoardDto {
  user: User;
  name: string;
}
