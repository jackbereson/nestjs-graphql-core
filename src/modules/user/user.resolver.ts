import { Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserPageData } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { QueryGetListInput } from '../../base/input.base';
import { ROLES, Roles } from '../../decorators/roles.decorator';
import { Ctx } from '../../decorators/ctx.decorator';
import { Context } from '../../auth/context';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => UserPageData)
  async findAll(@Args('q') args: QueryGetListInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.userService.fetch(args);
  }

  @Query(() => User, { name: 'User' })
  findOne(@Args('id', { type: () => String }) id: string, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') args: CreateUserInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.userService.create(args);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') args: UpdateUserInput, @Ctx() context: Context) {
    context.auth([ROLES.ADMIN])
    return this.userService.updateOne(args.id, args);
  }

  @Mutation(() => User)
  @Roles(ROLES.ADMIN)
  removeUser(@Args('id', { type: () => String }) id: string, @Ctx() context: Context) {
    return this.userService.remove(id);
  }
}
