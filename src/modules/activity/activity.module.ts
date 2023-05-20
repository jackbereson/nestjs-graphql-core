import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../databases/maindb/database.module";
import { ActivityService } from "./activity.service";
import { ActivityResolver } from "./activity.resolver";
import { ActivityProviders } from "./activity.model";

@Module({
  imports: [DatabaseModule],
  providers: [ActivityResolver, ActivityService, ...ActivityProviders],
})
export class ActivityModule {}
