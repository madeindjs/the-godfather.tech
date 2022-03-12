import { IsNumber, IsPositive } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreatePaiementDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  user: User;
}
