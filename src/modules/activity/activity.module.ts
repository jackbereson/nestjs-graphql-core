import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { TokenHelper } from '../../auth/jwt.auth';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { ActivityProviders } from './activity.model';

@Module({
    imports: [DatabaseModule],
    providers: [
      TokenHelper,
      ActivityResolver,
      ActivityService,
      ...ActivityProviders,
    ],
  })
export class ActivityModule {}