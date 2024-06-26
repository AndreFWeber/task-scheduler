import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AccountsModule, ScheduleModule, TaskModule],
})
export class AppModule {}
