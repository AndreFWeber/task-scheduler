// src/task/dto/update.dto.ts

import { IsEnum, IsInt, IsOptional, IsUUID } from 'class-validator';
import { IsISO8601Strict } from '../../commons/iso.validator';
import { TaskType } from '@prisma/client';

export class UpdateTaskDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsISO8601Strict()
  start_time: Date;

  @IsOptional()
  @IsInt()
  account_id: number;

  @IsInt()
  @IsOptional()
  duration: number;

  @IsOptional()
  @IsUUID()
  schedule_id: string;

  @IsOptional()
  @IsEnum(TaskType)
  type: TaskType;
}
