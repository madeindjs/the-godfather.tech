import { IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @IsString()
  name: string;

  @IsString()
  @IsUUID()
  boardId: string;
}
