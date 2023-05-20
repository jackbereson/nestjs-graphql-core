import { Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer, CustomerPageData } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { QueryGetListInput } from '../../base/input.base';
import { ROLES, Roles } from '../../decorators/roles.decorator';
import { Ctx } from '../../decorators/ctx.decorator';
import { Context } from '../../auth/context';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) { }

  @Query(() => CustomerPageData)
  async getAllCustomers(@Args('q') args: QueryGetListInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.customersService.fetch(args);
  }

  @Query(() => Customer)
  getOneCustomer(@Args('id', { type: () => ID }) id: string, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.customersService.findById(id);
  }

  @Mutation(() => Customer)
  createCustomer(@Args('createCustomerInput') args: CreateCustomerInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.customersService.create(args);
  }

  @Mutation(() => Customer)
  updateCustomer(@Args('updateCustomerInput') args: UpdateCustomerInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.customersService.updateOne(args.id, args);
  }

  @Mutation(() => Customer)
  @Roles(ROLES.ADMIN)
  removeCustomer(@Args('id', { type: () => ID }) id: string, @Ctx() context: Context) {
    return this.customersService.remove(id);
  }
}
