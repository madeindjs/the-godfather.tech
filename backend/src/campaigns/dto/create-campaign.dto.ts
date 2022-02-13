import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  content: string;

  @IsNumber()
  @IsPositive()
  amountPerDay: number;

  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @IsArray()
  @IsOptional()
  topics: string[];

  @IsNumber()
  @IsInt()
  @IsOptional()
  minStars: number;

  @IsNumber()
  @IsInt()
  @IsOptional()
  maxStars: number;
}
