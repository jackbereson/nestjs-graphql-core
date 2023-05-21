import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../databases/maindb/database.module";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserProviders } from "./user.model";
import { CounterService } from "../counter/counter.service";
import { CounterProviders } from "../counter/counter.model";

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, CounterService, UserService, ...CounterProviders, ...UserProviders],
})
export class UserModule { }
