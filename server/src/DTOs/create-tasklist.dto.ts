import { IsNumber, IsString } from 'class-validator';

export class CreateTaskListDto {
  @IsString()
  title: string;

  @IsNumber()
  taskBoardId: number
}
