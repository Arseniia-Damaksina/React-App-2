
import { IsString, IsNumber, IsDate, ValidateNested } from 'class-validator';

export class LogDto {
  @IsString()
  text: string;

  @IsString()
  date: string;
}

export class CreateActivityLogDto {
  @IsString()
  actionType: string;

  @IsNumber()
  taskId: number;

  @IsNumber()
  taskBoardId: number;

  @IsDate()
  createdAt: Date;

  @ValidateNested()
  log: LogDto;
}
