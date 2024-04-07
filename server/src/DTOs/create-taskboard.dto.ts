import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTaskBoardDto {
  @IsString()
  @IsNotEmpty()
  board: string;
}
