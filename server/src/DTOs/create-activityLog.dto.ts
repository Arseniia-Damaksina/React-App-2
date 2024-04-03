// export class CreateActivityLogDto {
//   actionType: string;
//   entityType: string;
//   entityTypeId: number;
//   createdAt: Date;
//   log: {
//     text: string,
//     date: string    
//   };
// }

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

  @IsString()
  entityType: string;

  @IsNumber()
  entityTypeId: number;

  @IsDate()
  createdAt: Date;

  @ValidateNested()
  log: LogDto;
}
