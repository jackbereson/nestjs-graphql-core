import { Resolver, Query, Mutation, Args, Int, Extensions, Field } from '@nestjs/graphql';
import { CustomersService } from './customers.service';
import { Customer, CustomerPageData } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { QueryGetListInput } from '../../base/input.base';
import { ROLES, Roles } from '../../decorators/roles.decorator';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(private readonly customersService: CustomersService) { }

  @Mutation(() => Customer)
  createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
    return this.customersService.create(createCustomerInput);
  }

  
  @Query(() => CustomerPageData)
  @Roles(ROLES.ADMIN)
  async findAll(@Args('q') queryGetListInput: QueryGetListInput) {
    console.log('queryGetListInput', queryGetListInput)
    return this.customersService.fetch(queryGetListInput);
  }

  @Query(() => Customer, { name: 'customer' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.customersService.findOne(id);
  }

  @Mutation(() => Customer)
  updateCustomer(@Args('updateCustomerInput') updateCustomerInput: UpdateCustomerInput) {
    // return this.customersService.update(updateCustomerInput.id, updateCustomerInput);
  }

  @Mutation(() => Customer)
  removeCustomer(@Args('id', { type: () => String }) id: string) {
    return this.customersService.remove(id);
  }

  @Mutation(() => Customer)
  async callSample() {

  }
}
