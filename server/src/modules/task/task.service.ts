import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from 'src/entities/task.entity';
import { CreateTaskDto } from 'src/DTOs/create-task.dto';
import { ActivityLogService } from 'src/modules/activityLog/activityLog.service';
import formatDate from 'src/utils/formatDate';

const taskActions = {
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  RENAME_TASK: 'RENAME_TASK',
  UPDATE_DESC: 'UPDATE_TASK_DESC',
  UPDATE_DATE: 'UPDATE_TASK_DATE',
  UPDATE_PRIORITY: 'UPDATE_PRIORITY',
  UPDATE_TASKLIST: 'UPDATE_TASKLIST',
  DELETE_TASK: 'DELETE_TASK',
};

const actionType = {
  TASKLIST: 'tasklist',
  TASK: 'task',
};

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private readonly activityLogService: ActivityLogService,
  ) {}

  async getAllTasks(): Promise<TaskEntity[]> {
    try {
      const tasks = await this.taskRepository.find();
      return tasks;
    } catch (error) {
      throw new Error('Failed to fetch all tasks');
    }
  }

  async getOneTask(id: number): Promise<TaskEntity> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      return task;
    } catch (error) {
      throw new Error('Failed to fetch task');
    }
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    try {
      const {
        name,
        description,
        dueDate,
        priority,
        taskListId,
        taskListTitle,
      } = createTaskDto;

      const newTask = this.taskRepository.create({
        name,
        description,
        dueDate,
        priority,
        taskListId,
        taskListTitle,
      });

      const savedTask = await this.taskRepository.save(newTask);

      await this.activityLogService.logAction({
        actionType: taskActions.CREATE_TASK,
        entityType: actionType.TASK,
        entityTypeId: savedTask.id,
        createdAt: new Date(),
        log: {
          text: `Task ${newTask.name} was created`,
          date: formatDate(new Date())
        }  
      });

      return savedTask;
    } catch (error) {
      throw new Error('Failed to create task');
    }
  }

  async updateTask(
    id: number,
    updateTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    try {
      const task = await this.getOneTask(id);
      if (!task) {
        throw new Error('Task not found');
      }

      const {
        name,
        description,
        dueDate,
        priority,
        taskListId,
        taskListTitle,
      } = updateTaskDto;

      const originalTask = { ...task };

      task.name = name;
      task.description = description;
      task.dueDate = dueDate;
      task.priority = priority;
      task.taskListId = taskListId;
      task.taskListTitle = taskListTitle;

      const updatedTask = await this.taskRepository.save(task);

      if (originalTask.name !== updatedTask.name) {
        await this.activityLogService.logAction({
          actionType: taskActions.RENAME_TASK,
          entityType: actionType.TASK,
          entityTypeId: updatedTask.id,
          createdAt: new Date(),
          log: {
            text: `Task was renamed from ${originalTask.name} to ${updatedTask.name}`,
            date: formatDate(new Date())
          }  
        });
      }

      if (originalTask.description !== updatedTask.description) {
        await this.activityLogService.logAction({
          actionType: taskActions.UPDATE_DESC,
          entityType: actionType.TASK,
          entityTypeId: updatedTask.id,
          createdAt: new Date(),
          log: {
            text: `Task description at ${updatedTask.name} was changed`,
            date: formatDate(new Date())
          } 
        });
      }

      if (originalTask.dueDate !== updatedTask.dueDate) {
        await this.activityLogService.logAction({
          actionType: taskActions.UPDATE_DATE,
          entityType: actionType.TASK,
          entityTypeId: updatedTask.id,
          createdAt: new Date(),
          log: {
            text: `Due date at ${updatedTask.name} was changed from ${originalTask.dueDate} to ${updatedTask.dueDate}`,
            date: formatDate(new Date())
          } 
        });
      }

      if (originalTask.priority !== updatedTask.priority) {
        await this.activityLogService.logAction({
          actionType: taskActions.UPDATE_PRIORITY,
          entityType: actionType.TASK,
          entityTypeId: updatedTask.id,
          createdAt: new Date(),
          log: {
            text: `Priority at ${updatedTask.name} was changed from ${originalTask.priority} to ${updatedTask.priority}`,
            date: formatDate(new Date())
          } 
        });
      }

      if (originalTask.taskListId !== updatedTask.taskListId) {
        await this.activityLogService.logAction({
          actionType: taskActions.UPDATE_TASKLIST,
          entityType: actionType.TASK,
          entityTypeId: updatedTask.id,
          createdAt: new Date(),
          log: {
            text: `Task ${updatedTask.name} was moved from ${originalTask.taskListTitle} to ${updatedTask.taskListTitle}`,
            date: formatDate(new Date())
          } 
        });
      }

      return updatedTask;
    } catch (error) {
      throw new Error('Failed to update task');
    }
  }

  async deleteTask(id: number): Promise<string> {
    try {
      const task = await this.getOneTask(id);
      const originalTask = { ...task };
      await this.taskRepository.remove(task);

      await this.activityLogService.logAction({
        actionType: taskActions.DELETE_TASK,
        entityType: actionType.TASK,
        entityTypeId: id,
        createdAt: new Date(),
        log: {
          text: `Task ${originalTask.name} was deleted`,
          date: formatDate(new Date())
        } 
      });

      return `Task ${task.name} has been successfully deleted.`;
    } catch (error) {
      throw new Error('Failed to delete task');
    }
  }
}
