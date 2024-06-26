import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TaskBoardEntity } from './taskboard.entity';
import { TaskEntity } from './task.entity';

@Entity()
export class TaskListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => TaskBoardEntity, taskBoard => taskBoard.taskLists, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'taskBoardId' })
    taskBoard: TaskBoardEntity;

    @Column()
    taskBoardId: number;

    @OneToMany(() => TaskEntity, task => task.taskList)
    tasks: TaskEntity[];
}




