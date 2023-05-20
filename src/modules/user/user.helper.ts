import { Inject, Injectable } from "@nestjs/common";
import { Model } from "../../base/model.base";
import { IUser } from "./entities/user.entity";
import { UserStatus } from "./user.model";
import { CounterService } from "../counter/counter.service";
import { generateToken } from "../../auth/jwt.auth";

@Injectable()
export class UserHelper {
  constructor(
    @Inject('USER_MODEL')
    private userModel?: Model<IUser>,
    private counterService?: CounterService
  ) {
  }

  setActivedAt(user: IUser) {
    if (user.status === UserStatus.ACTIVE && !user.activedAt) {
      user.activedAt = new Date();
    }
    return user;
  }

  generateCode() {
    return this.counterService.trigger("user").then((c) => "U" + c);
  }

  getToken(user) {
    return generateToken({
      role: user.role,
      _id: user._id,
      name: user.name,
      status: user.status,
    });
  }
}
