import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity()
export class TaskListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToMany(() => TaskEntity, task => task.taskList)
    tasks: TaskEntity[];
}






