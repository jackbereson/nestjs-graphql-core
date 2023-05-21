import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../databases/maindb/database.module";
import { SettingService } from "./setting.service";
import { SettingResolver } from "./setting.resolver";
import { SettingProviders } from "./setting.model";
import { SettingGroupService } from "../settingGroup/settingGroup.service";
import { SettingGroupProviders } from "../settingGroup/settingGroup.model";

@Module({
  imports: [DatabaseModule],
  providers: [SettingResolver, SettingGroupService, ...SettingGroupProviders, SettingService, ...SettingProviders],
})
export class SettingModule { }
