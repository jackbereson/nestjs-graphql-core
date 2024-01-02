import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CustomersService } from "../customers.service";
import { Customer } from "../entities/customer.entity";
import { Ctx } from "../../../decorators/ctx.decorator";
import { Context } from "../../../auth/context";
import { ErrorHelper } from "../../../helpers/error.helper";
import { CustomerStatus } from "../customers.model";
import { ROLES } from "../../../constants/role.const";
import {  Roles } from "../../../decorators/roles.decorator";

@Resolver(() => Customer)
export class CustomerGetMeResolver {
  constructor(private readonly customersService: CustomersService) {}

  @Query(() => Customer)
  async customerGetMe(@Ctx() context: Context) {
    context.auth([ROLES.CUSTOMER]);
    const customer = await this.customersService.model.findById(context.id);

    if (!customer) {
      throw ErrorHelper.unauthorized();
    }

    if (customer.status === CustomerStatus.DEACTIVATED) {
      throw ErrorHelper.unauthorized();
    }

    return customer;
  }
}
