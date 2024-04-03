import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskListEntity } from './tasklist.entity';
import { Priority } from 'src/enums/priority.enum';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dueDate: string;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @ManyToOne(() => TaskListEntity, taskList => taskList.tasks, { onDelete: 'CASCADE' })
  taskList: TaskListEntity;
  

  @Column()
  taskListId: number;

  @Column()
  taskListTitle: string;
}
