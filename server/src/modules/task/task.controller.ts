import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskEntity } from '../../entities/task.entity';
import { CreateTaskDto } from '../../DTOs/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<TaskEntity[]> {
    try {
      return await this.taskService.getAllTasks();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getOneTask(@Param('id') id: string): Promise<TaskEntity> {
    const taskId = parseInt(id, 10);
    try {
      const task = await this.taskService.getOneTask(taskId);
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const createdTask = await this.taskService.createTask(createTaskDto);
      return createdTask;
    } catch (error) {
      throw new HttpException(
        'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/update')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    const taskId = parseInt(id, 10);
    try {
      const updatedTask = await this.taskService.updateTask(
        taskId,
        updateTaskDto,
      );
      return updatedTask;
    } catch (error) {
      throw new HttpException(
        'Failed to update task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id/delete')
  async deleteTask(@Param('id') id: string): Promise<void> {
    const taskId = parseInt(id, 10);
    try {
      await this.taskService.deleteTask(taskId);
    } catch (error) {
      throw new HttpException(
        'Failed to delete task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
