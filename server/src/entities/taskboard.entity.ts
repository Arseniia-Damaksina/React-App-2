import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskListEntity } from './tasklist.entity';

@Entity()
export class TaskBoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    board: string;

    @OneToMany(() => TaskListEntity, taskList => taskList.taskBoard)
    taskLists: TaskListEntity[];
}
