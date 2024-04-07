import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ActivityLogService } from './activityLog.service';
import { ActivityLogEntity } from '../../entities/activityLog.entity';
import { CreateActivityLogDto } from '../../DTOs/create-activityLog.dto';

@Controller('activity')
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get()
  async getAllActions(): Promise<ActivityLogEntity[]> {
    try {
      return await this.activityLogService.getAllActions();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all activity logs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':taskBoardId/')
  async getActionsByTaskBoardId(
    @Param('taskBoardId') taskBoardId: string,
  ): Promise<ActivityLogEntity[]> {
    const boardId = parseInt(taskBoardId, 10);
    try {
      return await this.activityLogService.getActionsByTaskBoard(boardId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch activity logs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async logAction(
    @Body() createActivityLogDto: CreateActivityLogDto,
  ): Promise<ActivityLogEntity> {
    try {
      return await this.activityLogService.logAction(createActivityLogDto);
    } catch (error) {
      throw new HttpException(
        'Failed to log action',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':taskBoardId/')
  async deleteActivityLogByTaskBoardId(@Param('taskBoardId') taskBoardId: string): Promise<void> {
    try {
      await this.activityLogService.deleteActivityLogByTaskBoardId(parseInt(taskBoardId, 10));
    } catch (error) {
      throw new HttpException(
        'Failed to clear activity log',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
