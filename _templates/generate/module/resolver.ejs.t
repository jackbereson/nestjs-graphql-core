---
to: src/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.resolver.ts
---
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { <%= h.inflection.camelize(name) %>Service } from './<%= h.inflection.camelize(name, true) %>.service';
import { <%= h.inflection.camelize(name) %>, <%= h.inflection.camelize(name) %>PageData } from './entities/<%= h.inflection.camelize(name, true) %>.entity';
import { Create<%= h.inflection.camelize(name) %>Input } from './dto/create-<%= h.changeCase.paramCase(name, true) %>.input';
import { Update<%= h.inflection.camelize(name) %>Input } from './dto/update-<%= h.changeCase.paramCase(name, true) %>.input';
import { QueryGetListInput } from '../../base/input.base';
import { ROLES, Roles } from '../../decorators/roles.decorator';
import { Ctx } from '../../decorators/ctx.decorator';
import { Context } from '../../auth/context';

@Resolver(() => <%= h.inflection.camelize(name) %>)
export class <%= h.inflection.camelize(name) %>Resolver {
  constructor(private readonly <%= h.inflection.camelize(name, true) %>Service: <%= h.inflection.camelize(name) %>Service) { }

  @Query(() => <%= h.inflection.camelize(name) %>PageData)
  async getAll<%= h.inflection.camelize(h.inflection.camelize(name)) %>(@Args('q') args: QueryGetListInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.<%= h.inflection.camelize(name, true) %>Service.fetch(args);
  }

  @Query(() => <%= h.inflection.camelize(name) %>, { name: '<%= h.inflection.camelize(name) %>' })
  getOne<%= h.inflection.camelize(name) %>(@Args('id', { type: () => ID }) id: string, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.<%= h.inflection.camelize(name, true) %>Service.findOne(id);
  }

  @Mutation(() => <%= h.inflection.camelize(name) %>)
  create<%= h.inflection.camelize(name) %>(@Args('create<%= h.inflection.camelize(name) %>Input') args: Create<%= h.inflection.camelize(name) %>Input, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.<%= h.inflection.camelize(name, true) %>Service.create(args);
  }

  @Mutation(() => <%= h.inflection.camelize(name) %>)
  update<%= h.inflection.camelize(name) %>(@Args('update<%= h.inflection.camelize(name) %>Input') args: Update<%= h.inflection.camelize(name) %>Input, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.<%= h.inflection.camelize(name, true) %>Service.updateOne(args.id, args);
  }

  @Mutation(() => <%= h.inflection.camelize(name) %>)
  @Roles(ROLES.ADMIN)
  remove<%= h.inflection.camelize(name) %>(@Args('id', { type: () => ID }) id: string, @Ctx() context: Context) {
    return this.<%= h.inflection.camelize(name, true) %>Service.remove(id);
  }
}
