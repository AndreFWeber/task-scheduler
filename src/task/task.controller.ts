import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CreateTaskDto, DeleteByIdDto, GetByIdDto, UpdateTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTaskById(@Param() params: GetByIdDto) {
    return this.taskService.getTaskById({ id: params.id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTask(@Body() taskData: CreateTaskDto) {
    return this.taskService.createTask(taskData);
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateTask(@Body() taskData: UpdateTaskDto) {
    return this.taskService.updateTask({
      where: { id: taskData.id },
      data: taskData,
    });
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUserById(@Param() params: DeleteByIdDto) {
    return this.taskService.deleteTask({ id: params.id });
  }
}
