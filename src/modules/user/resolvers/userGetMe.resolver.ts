import { Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import { Ctx } from '../../../decorators/ctx.decorator';
import { Context } from '../../../auth/context';
import { ErrorHelper } from '../../../helpers/error.helper';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { UserStatus } from '../user.model';
import { ROLES, ROLE_GROUPS } from '../../../constants/role.const';

@Resolver(() => User)
export class UserGetMeResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  async userGetMe(@Ctx() context: Context) {
    context.auth(ROLE_GROUPS.ADMIN_OPERATOR);
    const data = await this.userService.model.findById(context.tokenData._id);

    if (!data) {
      throw ErrorHelper.userNotExist();
    }

    if (data.status === UserStatus.DEACTIVATED) {
      throw ErrorHelper.userError(". Deactivated!");
    }

    return data;
  }
}

