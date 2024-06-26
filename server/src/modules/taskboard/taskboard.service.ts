import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskBoardEntity } from '../../entities/taskboard.entity';
import { ActivityLogService } from '../activityLog/activityLog.service';
import { CreateTaskBoardDto } from '../../DTOs/create-taskboard.dto';
import formatDate from '../../utils/formatDate';

@Injectable()
export class TaskBoardService {
  constructor(
    @InjectRepository(TaskBoardEntity)
    private readonly taskBoardRepository: Repository<TaskBoardEntity>,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async getAllTaskboards(): Promise<TaskBoardEntity[]> {
    try {
      return await this.taskBoardRepository.find({ order: { id: 'ASC' }});
    } catch (error) {
      throw new Error('Failed to fetch all task boards');
    }
  }

  async getOneTaskboard(id: number): Promise<TaskBoardEntity> {
    try {
      return await this.taskBoardRepository.findOne({ where: { id } });
    }
catch (error) {
      throw new Error('Failed to fetch task board');
    }
  }

  async createTaskboard(createTaskboardDto: CreateTaskBoardDto): Promise<TaskBoardEntity> {
    try {
      const { board } = createTaskboardDto;
    
      const newTaskboard = this.taskBoardRepository.create({
        board
      });

      const savedTaskboard = await this.taskBoardRepository.save(newTaskboard);
      
      return savedTaskboard;
    } catch (error) {
      throw new Error('Failed to create task board');
    }
  }

  async updateTaskboard(id: number, updateTaskboardDto: CreateTaskBoardDto): Promise<TaskBoardEntity> {
    try {
      const taskboard = await this.taskBoardRepository.findOne({ where: { id } });
      if (taskboard) {
        taskboard.board = updateTaskboardDto.board;
        const updatedTaskboard = await this.taskBoardRepository.save(taskboard);
        return updatedTaskboard;
      } else {
        throw new Error('Task board not found');
      }
    } catch (error) {
      throw new Error('Failed to update task board');
    }
  }

  async deleteTaskboard(id: number): Promise<string> {
    try {
      const taskboard = await this.getOneTaskboard(id);
      await this.taskBoardRepository.remove(taskboard);
      await this.activityLogService.deleteActivityLogByTaskBoardId(id);
  
      return `Task board have been successfully deleted.`;
    } catch (error) {
      throw new Error('Failed to delete task board');
    }
  }
}
