import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { customersProviders } from './customers.model';
import { CustomerGetMeResolver } from './resolvers/customerGetMe.resolver';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { TokenHelper } from '../../auth/jwt.auth';

@Module({
    imports: [DatabaseModule],
    providers: [
      TokenHelper,
      CustomersResolver,
      CustomerGetMeResolver,
      CustomersService,
      ...customersProviders,
    ],
  })
export class CustomersModule {}