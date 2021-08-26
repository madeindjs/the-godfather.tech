import { IsObject, IsOptional } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateBoardDto {
  @IsOptional()
  @IsObject()
  data?: any;

  user: User;
}
