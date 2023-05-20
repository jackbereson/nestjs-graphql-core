import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../databases/maindb/database.module";
import { SettingService } from "./setting.service";
import { SettingResolver } from "./setting.resolver";
import { SettingProviders } from "./setting.model";

@Module({
  imports: [DatabaseModule],
  providers: [SettingResolver, SettingService, ...SettingProviders],
})
export class SettingModule {}
