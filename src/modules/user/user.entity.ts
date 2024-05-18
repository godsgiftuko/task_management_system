import Task from 'src/modules/task/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false, type: 'boolean' })
  verified: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;

  @VersionColumn()
  readonly version: number;
}
