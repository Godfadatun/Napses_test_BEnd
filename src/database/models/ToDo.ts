import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  @Column('timestamptz')
  created_at: Date;

  @Column('timestamptz')
  updated_at: Date;
}
