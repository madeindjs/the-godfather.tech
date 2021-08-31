import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsUUID()
  columnId: string;

  @IsString()
  @IsUUID()
  boardId: string;
}
