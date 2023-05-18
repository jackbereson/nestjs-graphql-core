import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { customersProviders } from './customer.model';
import { CustomerGetMesResolver } from './resolvers/customerGetMe.resolver';


export const CustomersModule = [CustomersResolver, CustomerGetMesResolver,  CustomersService, ...customersProviders]