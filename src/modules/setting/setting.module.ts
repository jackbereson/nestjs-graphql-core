import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { TokenHelper } from '../../auth/jwt.auth';
import { SettingService } from './setting.service';
import { SettingResolver } from './setting.resolver';
import { SettingProviders } from './setting.model';

@Module({
    imports: [DatabaseModule],
    providers: [
      TokenHelper,
      SettingResolver,
      SettingService,
      ...SettingProviders,
    ],
  })
export class SettingModule {}