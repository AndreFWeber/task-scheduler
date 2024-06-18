// src/schedule/dto/getById.dto.ts

import { IsUUID } from 'class-validator';

export class GetByIdDto {
  @IsUUID()
  id: string;
}
