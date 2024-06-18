// src/task/dto/create.dto.ts
import { IsEnum, IsInt, IsUUID } from 'class-validator';
import { IsISO8601Strict } from '../../commons/iso.validator';
import { TaskType } from '@prisma/client';

export class CreateTaskDto {
  @IsISO8601Strict()
  start_time: Date;

  @IsInt()
  account_id: number;

  @IsInt()
  duration: number;

  @IsUUID()
  schedule_id: string;

  @IsEnum(TaskType)
  type: TaskType;
}
