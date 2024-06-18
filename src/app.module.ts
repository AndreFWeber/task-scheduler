import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [AccountsModule, ScheduleModule],
})
export class AppModule {}
