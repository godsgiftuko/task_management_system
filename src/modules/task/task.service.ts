import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FindOneOptions, FindManyOptions } from 'typeorm';
import { TaskRepository } from './task.repository';
import { TaskDto } from './task.dto';
import { TaskEvents } from 'src/shared/events/task.events';
import Task from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepo: TaskRepository,
    private taskEvent: EventEmitter2,
  ) {}

  // Add Task
  async addTask(taskDto: TaskDto): Promise<Task> {
    const task = await this.taskRepo.create(taskDto);
    this.taskEvent.emit(TaskEvents.CREATED, task);
    return task;
  }

  // Find Task
  findOne(findOpts: FindOneOptions<Task>): Promise<Task> {
    return this.taskRepo.findOne(findOpts);
  }

  // Find Task ById
  findOneById(id: string): Promise<Task> {
    return this.taskRepo.findOne({
      where: { id },
    });
  }

  // Fetch Tasks
  fetchTasks(findOpts: FindManyOptions<Task>): Promise<any> {
    return this.taskRepo.findAllRecords(findOpts);
  }

  // Delete Task
  async deleteTask(id: string): Promise<void> {
    const task = await this.findOneById(id);
    await this.taskRepo.deleteTask(task);
  }

  // Update Task
  async updateTask(id: string, updates: Partial<Task>): Promise<void> {
    await this.taskRepo.updateTask(id, updates);
  }
}
