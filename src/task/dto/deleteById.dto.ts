// src/task/dto/deleteById.dto.ts

import { IsUUID } from 'class-validator';

export class DeleteByIdDto {
  @IsUUID()
  id: string;
}
