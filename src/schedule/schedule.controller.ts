import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Get, Param, Post, Put, Delete } from '@nestjs/common';
import {
  DeleteByIdDto,
  GetByIdDto,
  CreateScheduleDto,
  UpdateScheduleDto,
} from './dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getScheduleById(@Param() params: GetByIdDto) {
    return this.scheduleService.getScheduleById({ id: params.id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSchedule(@Body() scheduleData: CreateScheduleDto) {
    return this.scheduleService.createSchedule(scheduleData);
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateSchedule(@Body() scheduleData: UpdateScheduleDto) {
    return this.scheduleService.updateSchedule({
      where: { id: scheduleData.id },
      data: scheduleData,
    });
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteUserById(@Param() params: DeleteByIdDto) {
    return this.scheduleService.deleteSchedule({ id: params.id });
  }
}
