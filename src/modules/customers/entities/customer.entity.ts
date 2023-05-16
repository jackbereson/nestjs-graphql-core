import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CustomerStatus, CustomerWalletTypes } from '../schemas/customer.schema';
import { BaseDocument } from 'src/base/model.base';
import { BaseSchema, Pagination } from 'src/base/entity.base';

@ObjectType()
export class Customer extends BaseSchema {

  @Field(() => String, { description: 'Address of user' })
  address?: string

  @Field(() => String, { description: 'Address of user' })
  username?: string

  @Field(() => String, { description: 'Address of user' })
  balance?: number

  @Field(() => String, { description: 'Address of user' })
  walletType?: CustomerWalletTypes

  @Field(() => String, { description: 'Address of user' })
  email?: string

  @Field(() => String, { description: 'Address of user' })
  verifyCode?: string

  @Field(() => String, { description: 'Address of user' })
  referral?: string

  @Field(() => String, { description: 'Address of user' })
  shortUrl?: string

  @Field(() => String, { description: 'Address of user' })
  activedAt?: Date

  @Field(() => String, { description: 'Address of user' })
  role?: string

  @Field(() => String, { description: 'Address of user' })
  nonce?: string

  @Field(() => String, { description: 'Address of user' })
  addressIp?: string // address

  @Field(() => String, { description: 'Address of user' })
  referralCustomerId?: string

  @Field(() => String, { description: 'Address of user' })
  bannerUrl?: string

  @Field(() => String, { description: 'Address of user' })
  avatarUrl?: string

  @Field(() => String, { description: 'Address of user' })
  instagram?: string

  @Field(() => String, { description: 'Address of user' })
  website?: string

  @Field(() => String, { description: 'Address of user' })
  status?: CustomerStatus
}

@ObjectType()
export class CustomerPageData {

  @Field(() => [Customer], { description: 'Address of user',nullable:true })
  data?: Customer[]

  @Field(() => String, { description: 'Address of user',nullable:true })
  total?: number

  @Field(() => Pagination, { description: 'Address of user',nullable:true })
  pagination?: Pagination
}


export type ICustomer = BaseDocument & Customer