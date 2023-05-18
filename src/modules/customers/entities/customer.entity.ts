import { ObjectType, Field } from '@nestjs/graphql';
import { CustomerStatus, CustomerWalletTypes } from '../customer.model';
import { BaseSchema, Pagination } from '../../../base/entity.base';
import { BaseDocument } from '../../../base/model.base';

@ObjectType()
export class Customer extends BaseSchema {

  @Field(() => String, { description: 'Address' })
  address?: string

  @Field(() => String, { description: 'Username' })
  username?: string

  @Field(() => String, { description: 'Balance' })
  balance?: number

  @Field(() => String, { description: 'Wallet Type' })
  walletType?: CustomerWalletTypes

  @Field(() => String, { description: 'Email' })
  email?: string

  @Field(() => String, { description: 'Verify Code' })
  verifyCode?: string

  @Field(() => String, { description: 'Referral' })
  referral?: string

  @Field(() => String, { description: 'Short Url' })
  shortUrl?: string

  @Field(() => String, { description: 'Banner Url' })
  bannerUrl?: string

  @Field(() => String, { description: 'Avatar Url' })
  avatarUrl?: string


  @Field(() => String, { description: 'Active At' })
  activedAt?: Date

  @Field(() => String, { description: 'Role' })
  role?: string

  @Field(() => String, { description: 'Nonce' })
  nonce?: string

  addressIp?: string // address

  @Field(() => String, { description: `Roles: ${Object.keys(CustomerStatus).join(",")}` })
  status?: CustomerStatus
}

@ObjectType()
export class CustomerPageData {

  @Field(() => [Customer], { description: 'Customers', nullable: true })
  data?: Customer[]

  @Field(() => String, { description: 'Customer Total', nullable: true })
  total?: number

  @Field(() => Pagination, { description: 'Pagination', nullable: true })
  pagination?: Pagination
}


export type ICustomer = BaseDocument & Customer