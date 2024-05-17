import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // make sure task are tid to user
  @Post('new')
  addTask(@Body() taskPayload: TaskDto) {
    return this.taskService.addTask(taskPayload);
  }

  // User can get task by ID
  @Get('/id/:id')
  getTask(@Param('id') taskId: string) {
    return this.taskService.findOneById(taskId);
  }

  // User can get tasks

  // User can update a task

  // User can delete a task

  // User can delete many tasks

}
