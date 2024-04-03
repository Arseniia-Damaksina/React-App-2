import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ActivityLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionType: string;

  @Column()
  entityType: string;

  @Column()
  entityTypeId: number;

  @Column('jsonb')
  log: {
    text: string,
    date: string
  };


  @CreateDateColumn()
  createdAt: Date;
}
