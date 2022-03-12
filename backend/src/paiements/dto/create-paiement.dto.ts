import { IsNumber, IsPositive } from 'class-validator';

export class CreatePaiementDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}
