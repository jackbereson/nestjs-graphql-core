import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { set } from 'lodash';
import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../../base/crud.base';
import { User , IUser } from './entities/user.entity';
import { createPassword } from '../../helpers/encryption.helper';
import { UserStatus } from './user.model';
import { ROLES } from '../../constants/role.const';
import { UserHelper } from './user.helper';

@Injectable()
export class UserService extends CrudService<Model<IUser>> {

  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>
  ) {
    super(userModel);
  }


  async initData() {
    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
      const myUsername = process.env.ADMIN_USERNAME;
      const myPassword = process.env.ADMIN_PASSWORD;
      await this.userModel.deleteOne({});
      const user: User = {
        code: await new UserHelper().generateCode(),
        name: "Admin",
        email: myUsername,
        role: ROLES.ADMIN,
        activedAt: new Date(),
        status: UserStatus.ACTIVE,
      };

      const userCreating = new this.userModel(user);

      const md5Hash = crypto.createHash('md5');
      const password = md5Hash.update(myPassword).digest('hex');

      const hashPassword = createPassword(password, userCreating.id);
      set(userCreating, "password", hashPassword);

      await userCreating.save().then(() => {
        console.log("🚣 Admin created");
      });
    }
  }
}
