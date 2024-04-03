import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskListEntity } from 'src/entities/tasklist.entity';
import { CreateTaskListDto } from 'src/DTOs/create-tasklist.dto';
import { ActivityLogService } from 'src/modules/activityLog/activityLog.service';
import formatDate from 'src/utils/formatDate';

const taskListActions = {
  CREATE_TASKLIST: 'CREATE_TASKLIST',
  RENAME_TASKLIST: 'RENAME_TASKLIST',
  DELETE_TASKLIST: 'DELETE_TASKLIST'
}

const actionType = {
  TASKLIST: 'tasklist',
  TASK: 'task'
}

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskListEntity)
    private readonly taskListRepository: Repository<TaskListEntity>,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async getAllTasklists(): Promise<TaskListEntity[]> {
    try {
      return await this.taskListRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch all task lists');
    }
  }

  async getOneTasklist(id: number): Promise<TaskListEntity> {
    try {
      return await this.taskListRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Failed to fetch task list');
    }
  }

  async createTasklist(createTasklistDto: CreateTaskListDto): Promise<TaskListEntity> {
    try {
      const { title } = createTasklistDto;
    
      const newTasklist = this.taskListRepository.create({
        title
      });

      const savedTasklist = await this.taskListRepository.save(newTasklist);
      
      await this.activityLogService.logAction({
        actionType: taskListActions.CREATE_TASKLIST,
        entityType: actionType.TASKLIST,
        entityTypeId: savedTasklist.id,
        createdAt: new Date(),
        log: {
          text: `New task list ${newTasklist.title} was created`,
          date: formatDate(new Date())
        }
      });

      return savedTasklist;
    } catch (error) {
      throw new Error('Failed to create task list');
    }
  }

  async updateTasklist(id: number, updateTasklistDto: CreateTaskListDto): Promise<TaskListEntity> {
    try {
      const tasklist = await this.getOneTasklist(id);
      const tasklistOriginal = tasklist.title;
      tasklist.title = updateTasklistDto.title;
      const updatedTasklist = await this.taskListRepository.save(tasklist);
      
      await this.activityLogService.logAction({
        actionType: taskListActions.RENAME_TASKLIST,
        entityType: actionType.TASKLIST,
        entityTypeId: updatedTasklist.id,
        createdAt: new Date(),
        log: {
          text: `Task list was renamed from ${tasklistOriginal} to ${updateTasklistDto.title}`,
          date: formatDate(new Date())
        }
      });

      return updatedTasklist;
    } catch (error) {
      throw new Error('Failed to update task list');
    }
  }

  async deleteTasklist(id: number): Promise<string> {
    try {
      const tasklist = await this.getOneTasklist(id);
      const tasklistOriginal = tasklist.title;
      await this.taskListRepository.remove(tasklist);

      await this.activityLogService.logAction({
        actionType: taskListActions.DELETE_TASKLIST,
        entityType: actionType.TASKLIST,
        entityTypeId: id,
        createdAt: new Date(),
        log: {
          text: `Task list ${tasklistOriginal} was deleted`,
          date: formatDate(new Date())
        }       
      });

      return `Task list ${tasklist.title} has been successfully deleted.`;
    } catch (error) {
      throw new Error('Failed to delete task list');
    }
  }
}
