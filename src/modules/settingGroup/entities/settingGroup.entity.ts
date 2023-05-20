import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema, Pagination } from '../../../base/entity.base';
import { BaseDocument } from '../../../base/model.base';
import { SettingGroupStatus } from '../settingGroup.model';

@ObjectType()
export class SettingGroup extends BaseSchema {

  @Field(() => String, { description: 'Name' })
  name?: string

  @Field(() => String, { description: `Roles: ${Object.keys(SettingGroupStatus).join(",")}` })
  status?: SettingGroupStatus
}

@ObjectType()
export class SettingGroupPageData {

  @Field(() => [SettingGroup], { description: 'SettingGroups', nullable: true })
  data?: SettingGroup[]

  @Field(() => String, { description: 'SettingGroup Total', nullable: true })
  total?: number

  @Field(() => Pagination, { description: 'Pagination', nullable: true })
  pagination?: Pagination
}


export type ISettingGroup = BaseDocument & SettingGroup