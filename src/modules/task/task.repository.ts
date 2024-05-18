import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import Task from './task.entity';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskEntity: Repository<Task>,
  ) {}

  // Add Task
  create(taskDto?: Partial<TaskDto>): Promise<Task> {
    const task = this.taskEntity.create(taskDto);
    return this.taskEntity.save(task);
  }

  // Find One Task
  findOne(findOpts: FindOneOptions<Task>): Promise<Task> {
    return this.taskEntity.findOne(findOpts);
  }

  // Find Tasks
  findAllRecords(findOpts: FindManyOptions<Task>): Promise<[Task[], number]> {
    return this.taskEntity.findAndCount(findOpts);
  }

  // Delete Task
  deleteTask(task: Task): void {
    this.taskEntity.remove(task);
  }

  // Delete Many Tasks
  deleteManyTasks(taskIds: string[]): void {
    this.taskEntity.delete(taskIds);
  }

  // Update Task
  updateTask(
    updates: Partial<Task>,
    id: string,
    userId: string,
  ): Promise<UpdateResult> {
    return this.taskEntity.update({ id, userId }, updates);
  }
}
