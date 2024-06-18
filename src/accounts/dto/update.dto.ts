// src/schedule/dto/update.dto.ts

import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAccountDto {
  @IsInt()
  id: number;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  name: string;
}
