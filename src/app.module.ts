import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './modules/customers/customers.module';
import { RolesProvider } from './modules/guards/roles.provider';
import { JwtModule } from '@nestjs/jwt';
import { GraphQLLoggingMiddleware } from './middleware/logger.middleware';
import { configs } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    JwtModule.register({
      global: true,
      secret: configs.secretKey,
      signOptions: { expiresIn: configs.expiresIn },
    }),
    CustomersModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    RolesProvider,
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GraphQLLoggingMiddleware).forRoutes('graphql');
  }
}
