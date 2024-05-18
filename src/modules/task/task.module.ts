import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskGateway } from './task.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService, TaskGateway],
})
export class TaskModule {}
