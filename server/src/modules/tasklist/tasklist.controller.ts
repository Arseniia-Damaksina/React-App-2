import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  NotFoundException
} from '@nestjs/common';
import { TaskListService } from './tasklist.service';
import { TaskListEntity } from '../../entities/tasklist.entity';
import { CreateTaskListDto } from '../../DTOs/create-tasklist.dto';

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

  @Get(':taskBoardId/:taskListId')
  async getOneTasklist(
    @Param('taskBoardId', ParseIntPipe) taskBoardId: number,
    @Param('taskListId', ParseIntPipe) taskListId: number
  ): Promise<TaskListEntity> {
    try {
      const taskList = await this.taskListService.getOneTasklist(taskListId, taskBoardId);
      if (!taskList) {
        throw new NotFoundException(`Task list with ID ${taskListId} not found`);
      }
      return taskList;
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

  @Put(':taskBoardId/:id/update')
  async updateTasklist(
    @Param('taskBoardId', ParseIntPipe) taskBoardId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTasklistDto: CreateTaskListDto,
  ): Promise<TaskListEntity> {
    try {
      const updatedTasklist = await this.taskListService.updateTasklist(taskBoardId, id, updateTasklistDto);
      return updatedTasklist;
    } catch (error) {
      throw new HttpException(
        'Failed to update task list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':taskBoardId/:taskListId/delete')
  async deleteTasklist(
    @Param('taskBoardId', ParseIntPipe) taskBoardId: number,
    @Param('taskListId', ParseIntPipe) taskListId: number,
  ): Promise<void> {
    try {
      await this.taskListService.deleteTasklist(taskBoardId, taskListId,);
    } catch (error) {
      throw new HttpException(
        'Failed to delete task list',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
