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
  import { TaskBoardService } from './taskboard.service';
  import { TaskBoardEntity} from 'src/entities/taskboard.entity';
  import { CreateTaskBoardDto } from 'src/DTOs/create-taskboard.dto';
  
  @Controller('taskboards')
  export class TaskBoardController {
    constructor(private readonly taskBoardService: TaskBoardService) {}
  
    @Get()
    async getAllTaskboards(): Promise<TaskBoardEntity[]> {
      try {
        return await this.taskBoardService.getAllTaskboards();
      } catch (error) {
        throw new HttpException(
          'Failed to fetch all task boards',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Get(':id')
    async getOneTaskboard(@Param('id') id: string): Promise<TaskBoardEntity> {
      const taskBoardId = parseInt(id, 10);
      try {
        return await this.taskBoardService.getOneTaskboard(taskBoardId);
      } catch (error) {
        throw new HttpException(
          'Failed to fetch task board',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Post()
    async createTaskboard(
      @Body() createTaskboardtDto: CreateTaskBoardDto,
    ): Promise<TaskBoardEntity> {
      try {
        const createdTaskboard =
          await this.taskBoardService.createTaskboard(createTaskboardtDto);
        return createdTaskboard;
      } catch (error) {
        throw new HttpException(
          'Failed to create task board',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Put(':id/update')
    async updateTaskboard(
      @Param('id') id: string,
      @Body() updateTaskboardDto: CreateTaskBoardDto,
    ): Promise<TaskBoardEntity> {
      const taskBoardId = parseInt(id, 10);
      try {
        const updatedTaskboard = await this.taskBoardService.updateTaskboard(taskBoardId, updateTaskboardDto);
        return updatedTaskboard;
      } catch (error) {
        throw new HttpException(
          'Failed to update task board',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  
    @Delete(':id/delete')
    async deleteTaskboard(@Param('id') id: string): Promise<void> {
      const taskBoardId = parseInt(id, 10);
      try {
        await this.taskBoardService.deleteTaskboard(taskBoardId);
      } catch (error) {
        throw new HttpException(
          'Failed to delete task board',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  