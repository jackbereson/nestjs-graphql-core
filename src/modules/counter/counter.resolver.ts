import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { CounterService } from './counter.service';
import { Counter, CounterPageData } from './entities/counter.entity';
import { CreateCounterInput } from './dto/create-counter.input';
import { UpdateCounterInput } from './dto/update-counter.input';
import { QueryGetListInput } from '../../base/input.base';
import { ROLES, Roles } from '../../decorators/roles.decorator';
import { Ctx } from '../../decorators/ctx.decorator';
import { Context } from '../../auth/context';

@Resolver(() => Counter)
export class CounterResolver {
  constructor(private readonly counterService: CounterService) { }

  @Query(() => CounterPageData)
  async findAll(@Args('q') args: QueryGetListInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.counterService.fetch(args);
  }

  @Query(() => Counter, { name: 'Counter' })
  findOne(@Args('id', { type: () => String }) id: string, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.counterService.findOne(id);
  }

  @Mutation(() => Counter)
  createCounter(@Args('createCounterInput') args: CreateCounterInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.counterService.create(args);
  }

  @Mutation(() => Counter)
  updateCounter(@Args('updateCounterInput') args: UpdateCounterInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.counterService.updateOne(args.id, args);
  }

  @Mutation(() => Counter)
  @Roles(ROLES.ADMIN)
  removeCounter(@Args('id', { type: () => String }) id: string, @Ctx() context: Context) {
    return this.counterService.remove(id);
  }
}
