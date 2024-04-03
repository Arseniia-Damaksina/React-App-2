import { IsString } from 'class-validator';

export class CreateTaskBoardDto {
  @IsString()
  board: string;
}
