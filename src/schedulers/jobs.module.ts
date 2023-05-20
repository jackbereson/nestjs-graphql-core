import { Module } from '@nestjs/common';
import { TasksService } from './task.schedule';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  providers: [TasksService],
})
export class JobsModule { }