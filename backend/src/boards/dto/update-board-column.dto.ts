import { IsString } from 'class-validator';

export class UpdateBoardColumnDto {
  id: string;
  @IsString()
  name: string;
}
