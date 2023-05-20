import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CustomersService } from "../customers.service";
import { Customer } from "../entities/customer.entity";
import { ROLES, Roles } from "../../../decorators/roles.decorator";
import { Ctx } from "../../../decorators/ctx.decorator";
import { Context } from "../../../auth/context";
import { ErrorHelper } from "../../../helpers/error.helper";
import { CustomerStatus } from "../customers.model";

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

    if (customer.status === CustomerStatus.DEACTIVED) {
      throw ErrorHelper.unauthorized();
    }

    return customer;
  }
}
