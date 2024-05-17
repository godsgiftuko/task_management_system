import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import Task from './task.entity';

export class TaskDto extends Task {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
