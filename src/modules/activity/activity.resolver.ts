import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { ActivityService } from './activity.service';
import { Activity, ActivityPageData } from './entities/activity.entity';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';
import { QueryGetListInput } from '../../base/input.base';
import { ROLES, Roles } from '../../decorators/roles.decorator';
import { Ctx } from '../../decorators/ctx.decorator';
import { Context } from '../../auth/context';

@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) { }

  @Query(() => ActivityPageData)
  async findAll(@Args('q') args: QueryGetListInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.activityService.fetch(args);
  }

  @Query(() => Activity, { name: 'Activity' })
  findOne(@Args('id', { type: () => String }) id: string, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.activityService.findOne(id);
  }

  @Mutation(() => Activity)
  createActivity(@Args('createActivityInput') args: CreateActivityInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.activityService.create(args);
  }

  @Mutation(() => Activity)
  updateActivity(@Args('updateActivityInput') args: UpdateActivityInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.activityService.updateOne(args.id, args);
  }

  @Mutation(() => Activity)
  @Roles(ROLES.ADMIN)
  removeActivity(@Args('id', { type: () => String }) id: string, @Ctx() context: Context) {
    return this.activityService.remove(id);
  }
}
