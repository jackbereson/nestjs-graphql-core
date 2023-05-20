import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { TokenHelper } from '../../auth/jwt.auth';
import { SettingGroupService } from './settingGroup.service';
import { SettingGroupResolver } from './settingGroup.resolver';
import { SettingGroupProviders } from './settingGroup.model';

@Module({
    imports: [DatabaseModule],
    providers: [
      TokenHelper,
      SettingGroupResolver,
      SettingGroupService,
      ...SettingGroupProviders,
    ],
  })
export class SettingGroupModule {}