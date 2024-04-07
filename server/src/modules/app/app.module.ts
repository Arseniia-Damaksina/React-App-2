import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import configurations from '../../config';
import { TaskListModule } from '../tasklist/tasklist.module';
import { TaskModule } from '../task/task.module';
import { TaskBoardModule } from '../taskboard/taskboard.module';
import { ActivityLogModule } from '../activityLog/activityLog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('db_host'),
          port: configService.get('db_port'),
          username: configService.get('db_user'),
          password: configService.get('db_password'),
          database: configService.get('db'),
          autoLoadEntities: true,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true
        };
      },
    }),
    TaskBoardModule, TaskListModule, TaskModule, ActivityLogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
