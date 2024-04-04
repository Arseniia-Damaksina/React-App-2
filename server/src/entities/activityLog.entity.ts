import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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
