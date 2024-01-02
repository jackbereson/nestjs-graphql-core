import { Model } from "mongoose";
import * as crypto from "crypto";
import { set } from "lodash";
import { Injectable, Inject, Logger } from "@nestjs/common";
import { CrudService } from "../../base/crud.base";
import { User, IUser } from "./entities/user.entity";
import { createPassword } from "../../helpers/encryption.helper";
import { UserStatus } from "./user.model";
import { ROLES } from "../../constants/role.const";
import { CounterService } from "../counter/counter.service";

@Injectable()
export class UserService extends CrudService<Model<IUser>> {
  constructor(
    @Inject("USER_MODEL")
    private userModel?: Model<IUser>,
    @Inject(CounterService)
    private readonly counterService?: CounterService,
  ) {
    super(userModel);
  }

  async initNewUser() {
    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
      const myUsername = process.env.ADMIN_USERNAME;
      const myPassword = process.env.ADMIN_PASSWORD;
      await this.userModel.deleteOne({});

      const user: User = {
        code: await this.counterService.trigger("user").then((c) => "U" + c),
        name: "Admin",
        email: myUsername,
        role: ROLES.ADMIN,
        activedAt: new Date(),
        status: UserStatus.ACTIVED,
      };

      const userCreating = new this.userModel(user);

      const md5Hash = crypto.createHash("md5");
      const password = md5Hash.update(myPassword).digest("hex");

      const hashPassword = createPassword(password, userCreating.id);
      set(userCreating, "password", hashPassword);

      await userCreating.save().then(() => {
        new Logger("Nest Init").verbose(
          `⛳ Init User: Created new Admin`
        );
      });
    }
  }
}
