import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLogEntity } from 'src/entities/activityLog.entity';
import { CreateActivityLogDto } from 'src/DTOs/create-activityLog.dto';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLogEntity)
    private readonly activityLogRepository: Repository<ActivityLogEntity>,
  ) {}

  async logAction(
    activityLogDto: CreateActivityLogDto,
  ): Promise<ActivityLogEntity> {
    const activityLog = new ActivityLogEntity();
    activityLog.actionType = activityLogDto.actionType;
    activityLog.entityType = activityLogDto.entityType;
    activityLog.entityTypeId = activityLogDto.entityTypeId;
    activityLog.log = activityLogDto.log;
    activityLog.createdAt = activityLogDto.createdAt;
    
    return this.activityLogRepository.save(activityLog);
  }

  async getAllActions(): Promise<ActivityLogEntity[]> {
    return this.activityLogRepository.find();
  }

  async getActionsByTypeAndId(
    type: string,
    id: number,
  ): Promise<ActivityLogEntity[]> {
    return this.activityLogRepository.find({
      where: { entityType: type, entityTypeId: id },
    });
  }

  async getActionsByType(
    type: string
  ): Promise<ActivityLogEntity[]> {
    return this.activityLogRepository.find({
      where: { entityType: type },
    });
  }

  async clearActivityLog(): Promise<void> {
    try {
      await this.activityLogRepository.clear();
    } catch (error) {
      throw new Error('Failed to clear activity log');
    }
  }
}
