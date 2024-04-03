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
import { ActivityLogEntity } from 'src/entities/activityLog.entity';
import { CreateActivityLogDto } from 'src/DTOs/create-activityLog.dto';

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

  @Get(':type')
  async getActionsByType(
    @Param('type') type: string,
  ): Promise<ActivityLogEntity[]> {
    try {
      return await this.activityLogService.getActionsByType(type);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch activity logs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':type/:id')
  async getActionsByTypeAndId(
    @Param('type') type: string,
    @Param('id') id: string,
  ): Promise<ActivityLogEntity[]> {
    const entityId = parseInt(id, 10);
    try {
      return await this.activityLogService.getActionsByTypeAndId(type, entityId);
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

  @Delete()
  async clearActivityLog(): Promise<void> {
    try {
      await this.activityLogService.clearActivityLog();
    } catch (error) {
      throw new HttpException(
        'Failed to clear activity log',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
