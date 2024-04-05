import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { TaskBoardEntity } from './taskboard.entity';

@Entity()
export class ActivityLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionType: string;

  @Column()
  taskId: number;

  @Column()
  taskBoardId: number;
  
  @CreateDateColumn()
  createdAt: Date;

  @Column('jsonb')
  log: {
    text: string,
    date: string
  };
}
