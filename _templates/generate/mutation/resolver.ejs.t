---
to: src/modules/<%= h.inflection.camelize(name, true) %>/resolvers/<%= h.inflection.camelize(f, true) %>.resolver.ts
---
import { Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import { Ctx } from '../../../decorators/ctx.decorator';
import { Context } from '../../../auth/context';
import { ErrorHelper } from '../../../helpers/error.helper';
import { ROLES, Roles } from '../../../decorators/roles.decorator';
import { <%= h.inflection.camelize(name) %>Service } from '../<%= h.inflection.camelize(name, true) %>.service';
import { <%= h.inflection.camelize(name) %> } from '../entities/<%= h.inflection.camelize(name, true) %>.entity';
import { <%= h.inflection.camelize(name) %>Status } from '../<%= h.inflection.camelize(name, true) %>.model';

@Resolver(() => <%= h.inflection.camelize(name) %>)
export class <%= h.inflection.camelize(f) %>Resolver {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Service: <%= h.inflection.camelize(name) %>Service) { }

  @Mutation(() => <%= h.inflection.camelize(name) %>)
  async <%= h.inflection.camelize(f, true) %>(@Args('id', { type: () => ID }) id: string, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN]);
    const data = await this.<%= h.inflection.camelize(name, true) %>Service.model.findById(context.id);

    if (!data) {
      throw ErrorHelper.requestDataInvalid("id");
    }

    if (data.status === <%= h.inflection.camelize(name) %>Status.DEACTIVED) {
      throw ErrorHelper.requestDataInvalid("status");
    }

    return data;
  }
}

