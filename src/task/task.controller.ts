import { Body, Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { Get, Param, Post, Put, Delete } from '@nestjs/common';
import { TaskType } from '@prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById({ id });
  }

  @Post()
  async createTask(
    @Body()
    taskData: {
      account_id: number;
      schedule_id: string;
      start_time: string;
      duration: number;
      type: TaskType;
    },
  ) {
    return this.taskService.createTask(taskData);
  }

  @Put()
  async updateTask(
    @Body()
    taskData: {
      id: string;
      start_time: string;
      account_id: number;
      duration: number;
      schedule_id: string;
      type: TaskType;
    },
  ) {
    return this.taskService.updateTask({
      where: { id: taskData.id },
      data: taskData,
    });
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.taskService.deleteTask({ id });
  }
}
