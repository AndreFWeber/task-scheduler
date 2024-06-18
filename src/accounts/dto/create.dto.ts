// src/schedule/dto/create.dto.ts

import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @MinLength(2)
  @MaxLength(20)
  @IsString()
  name: string;
}
