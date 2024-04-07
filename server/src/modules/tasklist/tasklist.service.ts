import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskListEntity } from '../../entities/tasklist.entity';
import { CreateTaskListDto } from '../../DTOs/create-tasklist.dto';
import { ActivityLogService } from '../../modules/activityLog/activityLog.service';
import formatDate from '../../utils/formatDate';

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

  async getOneTasklist(taskBoardId: number, id: number): Promise<TaskListEntity> {
    try {
      return await this.taskListRepository.findOne({ where: { taskBoardId, id } });
    } catch (error) {
      throw new Error('Failed to fetch task list');
    }
  }
  
  async createTasklist(createTasklistDto: CreateTaskListDto): Promise<TaskListEntity> {
    try {
      const { title, taskBoardId } = createTasklistDto;    
      const newTasklist = this.taskListRepository.create({
        title, taskBoardId
      });
      const savedTasklist = await this.taskListRepository.save(newTasklist);
      
      return savedTasklist;
    } catch (error) {
      throw new Error('Failed to create task list');
    }
  }

  async updateTasklist(taskBoardId: number, id: number, updateTasklistDto: CreateTaskListDto): Promise<TaskListEntity> {
    try {
      const tasklist = await this.getOneTasklist(taskBoardId, id);
      tasklist.title = updateTasklistDto.title;
      const updatedTasklist = await this.taskListRepository.save(tasklist);
      
      return updatedTasklist;
    } catch (error) {
      throw new Error('Failed to update task list');
    }
  }

  async deleteTasklist(taskBoardId: number, id: number): Promise<string> {
    try {
      const tasklist = await this.getOneTasklist(taskBoardId, id);
      await this.taskListRepository.remove(tasklist);

      return `Task list ${tasklist.title} has been successfully deleted.`;
    } catch (error) {
      throw new Error('Failed to delete task list');
    }
  }
}
