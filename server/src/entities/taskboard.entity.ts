import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { TaskListEntity } from './tasklist.entity';
import { ActivityLogEntity } from './activityLog.entity';

@Entity()
export class TaskBoardEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    board: string;

    @OneToOne(() => ActivityLogEntity, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    activityLog: ActivityLogEntity;

    @OneToMany(() => TaskListEntity, taskList => taskList.taskBoard)
    taskLists: TaskListEntity[];
}
