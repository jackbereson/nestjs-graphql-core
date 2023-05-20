import { ObjectType, Field } from "@nestjs/graphql";
import { BaseSchema, Pagination } from "../../../base/entity.base";
import { BaseDocument } from "../../../base/model.base";
import { SettingStatus } from "../setting.model";

@ObjectType()
export class Setting extends BaseSchema {
  @Field(() => String, { description: "Name" })
  name?: string;

  @Field(() => String, {
    description: `Roles: ${Object.keys(SettingStatus).join(",")}`,
  })
  status?: SettingStatus;
}

@ObjectType()
export class SettingPageData {
  @Field(() => [Setting], { description: "Settings", nullable: true })
  data?: Setting[];

  @Field(() => String, { description: "Setting Total", nullable: true })
  total?: number;

  @Field(() => Pagination, { description: "Pagination", nullable: true })
  pagination?: Pagination;
}

export type ISetting = BaseDocument & Setting;
