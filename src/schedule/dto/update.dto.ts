// src/schedule/dto/update.dto.ts

import { IsInt, IsOptional, IsUUID } from 'class-validator';
import { IsISO8601Strict } from '../../commons/iso.validator';

export class UpdateScheduleDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsISO8601Strict()
  start_time: Date;

  @IsOptional()
  @IsISO8601Strict()
  end_time: Date;

  @IsOptional()
  @IsInt()
  account_id: number;

  @IsOptional()
  @IsInt()
  agent_id: number;
}
