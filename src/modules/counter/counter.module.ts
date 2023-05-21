import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../databases/maindb/database.module";
import { CounterService } from "./counter.service";
import { CounterResolver } from "./counter.resolver";
import { CounterProviders } from "./counter.model";

export const counterBaseModule = [CounterService,...CounterProviders];

@Module({
  imports: [DatabaseModule],
  providers: [CounterResolver, ...counterBaseModule],
})
export class CounterModule {}

