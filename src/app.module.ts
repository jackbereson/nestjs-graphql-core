import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { CustomersModule } from "./modules/customers/customers.module";
import { RolesProvider } from "./guards/roles.provider";
import { JwtModule } from "@nestjs/jwt";
import { GraphQLLoggingMiddleware } from "./middleware/logger.middleware";
import { configs } from "./configs";
import { EventErrorModule } from "./modules/eventError/eventError.module";
import { UserModule } from "./modules/user/user.module";
import { SettingModule } from "./modules/setting/setting.module";
import { CounterModule } from "./modules/counter/counter.module";
import { SettingGroupModule } from "./modules/settingGroup/settingGroup.module";
import { ActivityModule } from "./modules/activity/activity.module";
import { JobsModule } from "./jobs/jobs.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env'
      ]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    JwtModule.register({
      global: true,
      secret: configs.secretKey,
      signOptions: { expiresIn: configs.expiresIn },
    }),
    JobsModule,
    ActivityModule,
    CounterModule,
    SettingGroupModule,
    SettingModule,
    UserModule,
    CustomersModule,
    EventErrorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    RolesProvider,
    JobsModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GraphQLLoggingMiddleware).forRoutes("graphql");
  }
}
