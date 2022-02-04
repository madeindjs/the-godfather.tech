import { IsArray, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  content: string;

  @IsNumber()
  @IsPositive()
  amountPerDay: number;

  @IsArray()
  tags: string[];
}
