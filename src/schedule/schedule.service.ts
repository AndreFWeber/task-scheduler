import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Schedule, Prisma } from '@prisma/client';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async getScheduleById(
    scheduleWhereUniqueInput: Prisma.ScheduleWhereUniqueInput,
  ): Promise<Schedule | null> {
    return this.prisma.schedule.findUnique({
      where: scheduleWhereUniqueInput,
      include: {
        tasks: true,
        agent: true,
        account: true,
      },
    });
  }

  async createSchedule(
    data: Prisma.ScheduleUncheckedCreateInput,
  ): Promise<Schedule> {
    return this.prisma.schedule.create({
      data,
    });
  }

  async updateSchedule(params: {
    where: Prisma.ScheduleWhereUniqueInput;
    data: Prisma.ScheduleUncheckedUpdateInput;
  }): Promise<Schedule> {
    const { where, data } = params;
    return this.prisma.schedule.update({
      data,
      where,
    });
  }

  async deleteSchedule(
    where: Prisma.ScheduleWhereUniqueInput,
  ): Promise<Schedule> {
    return this.prisma.schedule.delete({
      where,
    });
  }
}
