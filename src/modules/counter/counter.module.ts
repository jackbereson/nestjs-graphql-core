import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { TokenHelper } from '../../auth/jwt.auth';
import { CounterService } from './counter.service';
import { CounterResolver } from './counter.resolver';
import { CounterProviders } from './counter.model';

@Module({
    imports: [DatabaseModule],
    providers: [
      TokenHelper,
      CounterResolver,
      CounterService,
      ...CounterProviders,
    ],
  })
export class CounterModule {}