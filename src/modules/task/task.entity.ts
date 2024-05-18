import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne,
} from 'typeorm';
import { ETaskStatus } from './task_status.enum';
import { configs } from 'config/config.env';
import User from '../user/user.entity';

const statusColOpts = getTaskStatusColOpts();

@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column(statusColOpts)
  status: ETaskStatus;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;

  @VersionColumn()
  readonly version: number;
}

function getTaskStatusColOpts(): any {
  return configs.USE_SQLITE
    ? { type: 'text', default: ETaskStatus.PENDING }
    : {
        type: 'enum',
        default: ETaskStatus.PENDING,
        enum: ETaskStatus,
      };
}
