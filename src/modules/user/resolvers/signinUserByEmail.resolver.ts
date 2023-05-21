import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Ctx } from '../../../decorators/ctx.decorator';
import { Context } from '../../../auth/context';
import { ErrorHelper } from '../../../helpers/error.helper';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';
import { comparePassword } from '../../../helpers/encryption.helper';
import { UserStatus } from '../user.model';
import { SigninUserInput } from '../dto/signin-user.input';
import { generateToken } from '../../../auth/jwt.auth';

@Resolver(() => User)
export class SigninUserByEmailResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User)
  async signinUserByEmail(@Args('args') args: SigninUserInput, @Ctx() context: Context) {
    let { email, password } = args;
    // console.log('------> phone', phone);

    const user = await this.userService.model.findOne({ email });

    if (!user) {
      throw ErrorHelper.userNotExist();
    }

    if (user.status === UserStatus.DEACTIVED) {
      throw ErrorHelper.userError(". DEACTIVED!");
    }

    const validPassword = comparePassword(password, user.id, user.password);

    if (!validPassword) {
      throw ErrorHelper.userPasswordNotCorrect();
    }

    delete user.password;
    user.token = generateToken({
      role: user.role,
      _id: user._id,
      name: user.name,
      status: user.status,
    })

    return user;
  }
}

