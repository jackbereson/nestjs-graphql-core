import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksJob {
    private readonly logger = new Logger(TasksJob.name);

    //   @Cron('1 * * * * *')
    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
        this.logger.debug('Called when the current second is 1');
    }
}
