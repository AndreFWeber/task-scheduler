// src/schedule/dto/create.dto.ts
import { IsInt } from 'class-validator';
import { IsISO8601Strict } from '../../commons/iso.validator';

export class CreateScheduleDto {
  @IsISO8601Strict()
  start_time: Date;

  @IsISO8601Strict()
  end_time: Date;

  @IsInt()
  account_id: number;

  @IsInt()
  agent_id: number;
}
