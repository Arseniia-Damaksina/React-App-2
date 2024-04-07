import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLogEntity } from '../../entities/activityLog.entity';
import { CreateActivityLogDto } from '../../DTOs/create-activityLog.dto';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLogEntity)
    private readonly activityLogRepository: Repository<ActivityLogEntity>,
  ) {}

  async getAllActions(): Promise<ActivityLogEntity[]> {
    return this.activityLogRepository.find();
  }

  async getActionsByTaskBoard(
    taskBoardId: number,
  ): Promise<ActivityLogEntity[]> {
    return this.activityLogRepository.find({
      where: { taskBoardId },
    });
  }

  async logAction(
    activityLogDto: CreateActivityLogDto,
  ): Promise<ActivityLogEntity> {
    const activityLog = new ActivityLogEntity();
    activityLog.actionType = activityLogDto.actionType;
    activityLog.taskId = activityLogDto.taskId;
    activityLog.taskBoardId = activityLogDto.taskBoardId;
    activityLog.log = activityLogDto.log;
    activityLog.createdAt = activityLogDto.createdAt;
    
    return this.activityLogRepository.save(activityLog);
  }

  async deleteActivityLogByTaskBoardId(taskBoardId: number): Promise<void> {
    try {
      await this.activityLogRepository.delete({ taskBoardId });
    } catch (error) {
      throw new Error('Failed to clear activity log');
    }
  }
}
