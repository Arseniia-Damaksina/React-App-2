import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../../entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ActivityLogModule } from '../activityLog/activityLog.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), ActivityLogModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
