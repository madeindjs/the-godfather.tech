import { IsArray, IsNumber, IsPositive } from 'class-validator';

export class CreateCampaignDto {
  @IsNumber()
  @IsPositive()
  amountPerDay: number;

  @IsArray()
  tags: string[];
}
