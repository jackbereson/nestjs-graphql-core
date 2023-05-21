import { ObjectType, Field } from "@nestjs/graphql";
import { BaseSchema, Pagination } from "../../../base/entity.base";
import { BaseDocument } from "../../../base/model.base";

@ObjectType()
export class SettingGroup extends BaseSchema {

  @Field(() => String, { description: "Slug" })
  slug?: string;

  @Field(() => String, { description: "Name" })
  name?: string;

  @Field(() => String, { description: "Desc" })
  desc?: string;
  
  @Field(() => String, { description: "Icon" })
  icon?: string;

  @Field(() => String, { description: "Read only" })
  readOnly?: boolean;
}

@ObjectType()
export class SettingGroupPageData {
  @Field(() => [SettingGroup], { description: "SettingGroups", nullable: true })
  data?: SettingGroup[];

  @Field(() => String, { description: "SettingGroup Total", nullable: true })
  total?: number;

  @Field(() => Pagination, { description: "Pagination", nullable: true })
  pagination?: Pagination;
}

export type ISettingGroup = BaseDocument & SettingGroup;
