import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema, Pagination } from '../../../base/entity.base';
import { BaseDocument } from '../../../base/model.base';
import { UserStatus } from '../user.model';

@ObjectType()
export class User extends BaseSchema {

  @Field(() => String, { description: 'Name' })
  name?: string

  @Field(() => String, { description: `Roles: ${Object.keys(UserStatus).join(",")}` })
  status?: UserStatus
}

@ObjectType()
export class UserPageData {

  @Field(() => [User], { description: 'Users', nullable: true })
  data?: User[]

  @Field(() => String, { description: 'User Total', nullable: true })
  total?: number

  @Field(() => Pagination, { description: 'Pagination', nullable: true })
  pagination?: Pagination
}


export type IUser = BaseDocument & User