import { ObjectType, Field } from "@nestjs/graphql";
import { BaseSchema, Pagination } from "../../../base/entity.base";
import { BaseDocument } from "../../../base/model.base";
import { UserStatus } from "../user.model";
import { ROLES } from "../../../constants/role.const";

@ObjectType()
export class User extends BaseSchema {
  @Field(() => String, { description: "Name" })
  name?: string;

  @Field(() => String, { description: "Wallet Address" })
  walletAddress?: string;

  @Field(() => String, { description: "Code" })
  code?: string;

  @Field(() => String, { description: "Email" })
  email?: string;

  @Field(() => String, { description: "Role" })
  role?: ROLES;

  @Field(() => String, { description: "Avatar" })
  avatar?: string;

  @Field(() => Date, { description: "Last login at" })
  lastLoginAt?: Date;

  @Field(() => Date, { description: "Active at" })
  activedAt?: Date;

  @Field(() => String, {
    description: `Status: ${Object.keys(UserStatus).join(",")}`,
  })
  status?: UserStatus;

  @Field(() => Date, { description: "Token" })
  token?: string;

  password?: string;
}

@ObjectType()
export class UserPageData {
  @Field(() => [User], { description: "Users", nullable: true })
  data?: User[];

  @Field(() => String, { description: "User Total", nullable: true })
  total?: number;

  @Field(() => Pagination, { description: "Pagination", nullable: true })
  pagination?: Pagination;
}

export type IUser = BaseDocument & User;
