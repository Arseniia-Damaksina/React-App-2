import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLogEntity } from 'src/entities/activityLog.entity';
import { ActivityLogController } from './activityLog.controller';
import { ActivityLogService } from './activityLog.service';

@Module({
    imports: [TypeOrmModule.forFeature([ActivityLogEntity])],
    controllers: [ActivityLogController],
    providers: [ActivityLogService],
    exports: [ActivityLogService], 
})
export class ActivityLogModule {}
