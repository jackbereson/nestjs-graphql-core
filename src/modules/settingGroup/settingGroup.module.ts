import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../databases/maindb/database.module';
import { SettingGroupService } from './settingGroup.service';
import { SettingGroupResolver } from './settingGroup.resolver';
import { SettingGroupProviders } from './settingGroup.model';

@Module({
    imports: [DatabaseModule],
    providers: [
      SettingGroupResolver,
      SettingGroupService,
      ...SettingGroupProviders,
    ],
  })
export class SettingGroupModule {}