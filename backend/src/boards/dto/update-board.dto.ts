import { IsObject } from 'class-validator';

export class UpdateBoardDto {
  @IsObject()
  data?: any;
}
