import { Body, Controller } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Get, Param, Post, Put, Delete } from '@nestjs/common';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get(':id')
  async getScheduleById(@Param('id') id: string) {
    return this.scheduleService.getScheduleById({ id });
  }

  @Post()
  async createSchedule(
    @Body()
    scheduleData: {
      start_time: string;
      end_time: string;
      account_id: number;
      agent_id: number;
    },
  ) {
    return this.scheduleService.createSchedule(scheduleData);
  }

  @Put()
  async updateSchedule(
    @Body()
    scheduleData: {
      id: string;
      start_time: string;
      end_time: string;
      account_id: number;
      agent_id: number;
    },
  ) {
    return this.scheduleService.updateSchedule({
      where: { id: scheduleData.id },
      data: scheduleData,
    });
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.scheduleService.deleteSchedule({ id });
  }
}
