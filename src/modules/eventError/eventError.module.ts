import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { TokenHelper } from '../../auth/jwt.auth';
import { EventErrorService } from './eventError.service';
import { EventErrorResolver } from './eventError.resolver';
import { EventErrorProviders } from './eventError.model';

@Module({
    imports: [DatabaseModule],
    providers: [
      TokenHelper,
      EventErrorResolver,
      EventErrorService,
      ...EventErrorProviders,
    ],
  })
export class EventErrorModule {}