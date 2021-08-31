import { IsString } from 'class-validator';

export class UpdateCardDto {
  id: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
}
