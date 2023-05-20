import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { SettingGroupService } from './settingGroup.service';
import { SettingGroup, SettingGroupPageData } from './entities/settingGroup.entity';
import { CreateSettingGroupInput } from './dto/create-settingGroup.input';
import { UpdateSettingGroupInput } from './dto/update-settingGroup.input';
import { QueryGetListInput } from '../../base/input.base';
import { ROLES, Roles } from '../../decorators/roles.decorator';
import { Ctx } from '../../decorators/ctx.decorator';
import { Context } from '../../auth/context';

@Resolver(() => SettingGroup)
export class SettingGroupResolver {
  constructor(private readonly settingGroupService: SettingGroupService) { }

  @Query(() => SettingGroupPageData)
  async findAll(@Args('q') args: QueryGetListInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.settingGroupService.fetch(args);
  }

  @Query(() => SettingGroup, { name: 'SettingGroup' })
  findOne(@Args('id', { type: () => String }) id: string, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.settingGroupService.findOne(id);
  }

  @Mutation(() => SettingGroup)
  createSettingGroup(@Args('createSettingGroupInput') args: CreateSettingGroupInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.settingGroupService.create(args);
  }

  @Mutation(() => SettingGroup)
  updateSettingGroup(@Args('updateSettingGroupInput') args: UpdateSettingGroupInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.settingGroupService.updateOne(args.id, args);
  }

  @Mutation(() => SettingGroup)
  @Roles(ROLES.ADMIN)
  removeSettingGroup(@Args('id', { type: () => String }) id: string, @Ctx() context: Context) {
    return this.settingGroupService.remove(id);
  }
}
