import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListEntity } from 'src/entities/tasklist.entity';
import { TaskListController } from './tasklist.controller';
import { TaskListService } from './tasklist.service';
import { ActivityLogModule } from 'src/modules/activityLog/activityLog.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskListEntity]),
        ActivityLogModule
    ],
    controllers: [TaskListController],
    providers: [TaskListService],
})
export class TaskListModule {}
