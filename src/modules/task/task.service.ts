import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FindOneOptions, FindManyOptions } from 'typeorm';
import { TaskRepository } from './task.repository';
import { TaskDto } from './task.dto';
import { TaskEvents } from 'src/shared/events/task.events';
import Task from './task.entity';
import { paginate_records } from 'src/shared/utils/pagination';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepo: TaskRepository,
    private taskEvent: EventEmitter2,
  ) {}

  // Add Task
  async addTask(taskDto: TaskDto): Promise<Task> {
    try {
      const task = await this.taskRepo.create(taskDto);
      this.taskEvent.emit(TaskEvents.CREATED, task);
      return task;
    } catch (error) {
      throw 'Failed to new add task';
    }
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
  async fetchTasks(findOpts: FindManyOptions<Task>): Promise<any> {
    try {
      const records = await this.taskRepo.findAllRecords(findOpts);
      return paginate_records(records, findOpts.skip, findOpts.take);
    } catch (err) {
      throw 'Failed fetch tasks';
    }
  }

  // Delete Task
  async deleteTask(id: string): Promise<void> {
    try {
      const task = await this.findOneById(id);
      await this.taskRepo.deleteTask(task);
    } catch (err) {
      throw `Failed to delete task: ${id}`;
    }
  }

  // Delete Many Tasks
  async deleteManyTasks(taskIds: string[]): Promise<void> {
    try {
      await this.taskRepo.deleteManyTasks(taskIds);
    } catch (err) {
      throw 'Failed to delete tasks';
    }
  }

  // Update Task
  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    try {
      const updated = await this.taskRepo.updateTask(id, updates);
      if (updated) {
        return this.findOneById(id);
      }
      throw new HttpException(
        `Failed to update task: ${id}`,
        HttpStatus.EXPECTATION_FAILED,
      );
    } catch (err) {
      throw err;
    }
  }
}
