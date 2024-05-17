import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { BulkDeleteTaskDto, TaskDto } from './task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { GetUser } from '../auth/decorators/get_user.decorator';
import User from '../user/entities/user.entity';
import { apiResponse } from 'src/shared/helpers/api_response.helper';
import { FindDataRequestDto } from 'src/shared/dtos/find.data.request.dto';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // make sure task are tid to user
  @Post('new')
  async addTask(@Body() taskPayload: TaskDto) {
    const data = await this.taskService.addTask(taskPayload);
    return apiResponse({
      data,
      message: 'Added task successfully!',
    });
  }

  // User can get task by ID
  @Get('/id/:id')
  getTask(@Param('id') taskId: string) {
    return this.taskService.findOneById(taskId);
  }

  // User can get tasks
  @Get()
  getTasks(@Query() queries: FindDataRequestDto) {
    return this.taskService.fetchTasks({
      take: Number(queries.take || '10'),
      skip: Number(queries.skip || '0'),
    });
  }

  // User can update a task
  @Put('/id/:id')
  updateTask(@Body() taskPayload: TaskDto, @Param('id') taskId: string) {
    return this.taskService.updateTask(taskId, taskPayload);
  }

  // User can delete a task
  @Delete('/id/:id')
  deleteTask(@Param('id') taskId: string) {
    return this.taskService.deleteTask(taskId);
  }

  // User can delete many tasks
  @Delete()
  deleteManyTask(@Body() { taskIds }: BulkDeleteTaskDto) {
    return this.taskService.deleteManyTasks(taskIds);
  }
}
