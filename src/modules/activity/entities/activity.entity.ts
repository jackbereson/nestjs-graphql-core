import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema, Pagination } from '../../../base/entity.base';
import { BaseDocument } from '../../../base/model.base';
import { ActivityStatus } from '../activity.model';

export enum ActivityTypes {
  ADMIN_SIGNIN = "ADMIN_SIGNIN",
  CUSTOMER_SIGNIN = "CUSTOMER_SIGNIN",
  CUSTOMER_SIGNIN_MINING = "CUSTOMER_SIGNIN_MINING",
  CUSTOMER_REGISTER = "CUSTOMER_REGISTER",
  CUSTOMER_BUY_TOKEN = "CUSTOMER_BUY_TOKEN",
  CUSTOMER_CLAIM_TOKEN = "CUSTOMER_CLAIM_TOKEN",
  CUSTOMER_AIRDROP = "CUSTOMER_AIRDROP",
  CUSTOMER_GACHA_AIRDROP = "CUSTOMER_GACHA_AIRDROP",
  CUSTOMER_GACHA_AIRDROP_UPDATE = "CUSTOMER_GACHA_AIRDROP_UPDATE",
  CUSTOMER_AIRDROP_REJECT = "CUSTOMER_AIRDROP_REJECT",
  CUSTOMER_LIST_NFT = "CUSTOMER_LIST_NFT",
  CUSTOMER_CREATE_SUPPORT = "CUSTOMER_CREATE_SUPPORT",
  CUSTOMER_UPDATE_REFERAL = "CUSTOMER_UPDATE_REFERAL",
  CUSTOMER_CREATE_REFERRAL = "CUSTOMER_CREATE_REFERRAL",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  RESET = "RESET",
}

export enum ChangedFactors {
  CAMPAIGN = "CAMPAIGN",
  TRANSACTION = "TRANSACTION",
  NFT = "NFT",
  USER = "USER",
  CUSTOMER = "CUSTOMER",
  SETTING = "SETTING",
  SETTING_GROUP = "SETTING_GROUP",
  JOBS = "JOBS",
  PROVIDER = "PROVIDER",
  SUPPORT = "SUPPORT",
  REFERRAL_LINK = "REFERRAL_LINK",
}

@ObjectType()
export class Activity extends BaseSchema {

  @Field(() => String, { description: 'Name' })
  name?: string

  userId?: string;
  customerId?: string;
  factorId?: string;

  @Field(() => String, { description: `Message` })
  message?: string;

  @Field(() => String, { description: `Type` })
  type?: ActivityTypes;

  @Field(() => String, { description: `Factor` })
  changedFactor?: ChangedFactors;

  @Field(() => String, { description: `Roles: ${Object.keys(ActivityStatus).join(",")}` })
  status?: ActivityStatus
}

@ObjectType()
export class ActivityPageData {

  @Field(() => [Activity], { description: 'Activities', nullable: true })
  data?: Activity[]

  @Field(() => String, { description: 'Activity Total', nullable: true })
  total?: number

  @Field(() => Pagination, { description: 'Pagination', nullable: true })
  pagination?: Pagination
}


export type IActivity = BaseDocument & Activity