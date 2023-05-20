import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { customersProviders } from './customers.model';
import { CustomerGetMeResolver } from './resolvers/customerGetMe.resolver';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../databases/maindb/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [
      CustomersResolver,
      CustomerGetMeResolver,
      CustomersService,
      ...customersProviders,
    ],
  })
export class CustomersModule {}