import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../databases/maindb/database.module";
import { EventErrorService } from "./eventError.service";
import { EventErrorResolver } from "./eventError.resolver";
import { EventErrorProviders } from "./eventError.model";

@Module({
  imports: [DatabaseModule],
  providers: [EventErrorResolver, EventErrorService, ...EventErrorProviders],
})
export class EventErrorModule {}
