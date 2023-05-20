import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../databases/maindb/database.module";
import { CounterService } from "./counter.service";
import { CounterResolver } from "./counter.resolver";
import { CounterProviders } from "./counter.model";

@Module({
  imports: [DatabaseModule],
  providers: [CounterResolver, CounterService, ...CounterProviders],
})
export class CounterModule {}
