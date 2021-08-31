import { IsString, IsUUID } from 'class-validator';

export class CreateBoardColumnDto {
  @IsString()
  name: string;

  @IsString()
  @IsUUID()
  boardId: string;
}
