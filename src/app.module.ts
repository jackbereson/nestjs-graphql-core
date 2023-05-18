import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DatabaseModule } from './database.module';
import { CustomersModule } from './modules/customers/customers.module';
import { RolesModule } from './modules/guards/roles.module';
import { LoggingPlugin } from './plugins/logging.plugin';
import { JwtModule } from '@nestjs/jwt';


dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '2d' },
    })
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    RolesModule,
    ...CustomersModule,
    // LoggingPlugin,
  ],
})
export class AppModule { }
