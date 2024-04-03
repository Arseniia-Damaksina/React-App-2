import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskBoardEntity } from 'src/entities/taskboard.entity';
import { TaskBoardController } from './taskboard.controller';
import { TaskBoardService } from './taskboard.service';
import { ActivityLogModule } from 'src/modules/activityLog/activityLog.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskBoardEntity]),
        ActivityLogModule
    ],
    controllers: [TaskBoardController],
    providers: [TaskBoardService],
})
export class TaskBoardModule {}
