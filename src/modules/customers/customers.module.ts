import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { customersProviders } from './schemas/customer.schema';


export const CustomersModule = [CustomersResolver, CustomersService, ...customersProviders]