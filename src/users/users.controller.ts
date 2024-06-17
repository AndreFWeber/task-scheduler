import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  getUser() {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com'
    };
  }
}
