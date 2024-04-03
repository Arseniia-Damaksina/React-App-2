import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskListService } from './tasklist.service';
import { TaskListEntity } from 'src/entities/tasklist.entity';
import { CreateTaskListDto } from 'src/DTOs/create-tasklist.dto';

@Controller('tasklists')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Get()
  async getAllTasklists(): Promise<TaskListEntity[]> {
    try {
      return await this.taskListService.getAllTasklists();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch all task lists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getOneTasklist(@Param('id') id: string): Promise<TaskListEntity> {
    const taskId = parseInt(id, 10);
    try {
      return await this.taskListService.getOneTasklist(taskId);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch task list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createTasklist(
    @Body() createTasklistDto: CreateTaskListDto,
  ): Promise<TaskListEntity> {
    try {
      const createdTasklist =
        await this.taskListService.createTasklist(createTasklistDto);
      return createdTasklist;
    } catch (error) {
      throw new HttpException(
        'Failed to create task list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/update')
  async updateTasklist(
    @Param('id') id: string,
    @Body() updateTasklistDto: CreateTaskListDto,
  ): Promise<TaskListEntity> {
    const taskId = parseInt(id, 10);
    try {
      const updatedTasklist = await this.taskListService.updateTasklist(taskId, updateTasklistDto);
      return updatedTasklist;
    } catch (error) {
      throw new HttpException(
        'Failed to update task list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id/delete')
  async deleteTasklist(@Param('id') id: string): Promise<void> {
    const taskId = parseInt(id, 10);
    try {
      await this.taskListService.deleteTasklist(taskId);
    } catch (error) {
      throw new HttpException(
        'Failed to delete task list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
