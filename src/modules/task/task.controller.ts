import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { BulkDeleteTaskDto, TaskDto } from './task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { apiResponse } from 'src/shared/helpers/api_response.helper';
import { FindDataRequestDto } from 'src/shared/dtos/find.data.request.dto';
import { GetUser } from 'src/shared/decorators/get_user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // make sure task are tid to user
  @Post('new')
  async addTask(@Body() taskPayload: TaskDto, @GetUser('id') userId: string) {
    const data = await this.taskService.addTask(taskPayload, userId);
    return apiResponse({
      data,
      message: 'Added task successfully!',
    });
  }

  // User can get task by ID
  @Get('/id/:id')
  async getTask(@Param('id') id: string, @GetUser('id') userId: string) {
    const data = await this.taskService.findOne({
      where: { id, userId },
    });
    return apiResponse({ data });
  }

  // User can get tasks
  @Get()
  async getTasks(
    @Query() queries: FindDataRequestDto,
    @GetUser('id') userId: string,
  ) {
    const data = await this.taskService.fetchTasks({
      where: { userId },
      take: Number(queries.take || '10'),
      skip: Number(queries.skip || '0'),
    });
    return apiResponse({ data });
  }

  // User can update a task
  @Put('/id/:id')
  async updateTask(
    @Body() taskPayload: TaskDto,
    @Param('id') taskId: string,
    @GetUser('id') userId: string,
  ) {
    const data = await this.taskService.updateTask(taskPayload, taskId, userId);
    return apiResponse({ data });
  }

  // User can delete a task
  @Delete('/id/:id')
  async deleteTask(@Param('id') taskId: string, @GetUser('id') userId: string,) {
    const data = await this.taskService.deleteTask(taskId, userId);
    return apiResponse({ data });
  }

  // User can delete many tasks
  @Delete()
  async deleteManyTask(@Body() { taskIds }: BulkDeleteTaskDto) {
    const data = await this.taskService.deleteManyTasks(taskIds);
    return apiResponse({ data });
  }
}
