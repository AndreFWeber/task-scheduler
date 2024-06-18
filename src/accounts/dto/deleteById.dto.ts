// src/schedule/dto/deleteById.dto.ts

import { IsNumberString } from 'class-validator';

export class DeleteByIdDto {
  @IsNumberString()
  id: number;
}
