import { IsString, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { Priority } from '../enums/priority.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  dueDate: string;

  @IsEnum(Priority)
  priority: Priority;

  @IsNumber()
  taskListId: number;

  @IsNumber()
  taskBoardId: number;

  @IsString()
  @IsNotEmpty()
  taskListTitle: string;
}

