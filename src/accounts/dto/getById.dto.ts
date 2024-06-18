// src/schedule/dto/getById.dto.ts

import { IsNumberString } from 'class-validator';

export class GetByIdDto {
  @IsNumberString()
  id: number;
}
