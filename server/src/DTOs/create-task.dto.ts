import { IsString, IsEnum, IsNumber } from 'class-validator';
import { Priority } from 'src/enums/priority.enum';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  dueDate: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsNumber()
  taskListId: number;

  @IsNumber()
  taskBoardId: number;

  @IsString()
  taskListTitle: string;
}

