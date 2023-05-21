import { ObjectType, Field, ID } from "@nestjs/graphql";
import { BaseSchema, Pagination } from "../../../base/entity.base";
import { BaseDocument } from "../../../base/model.base";
import { EditModes, SettingTypes } from "../setting.model";
import { GraphQLJSON, GraphQLJSONObject } from "graphql-type-json";

@ObjectType()
export class Setting extends BaseSchema {


  @Field(() => String, { description: "Name" })
  name?: string;

  @Field(() => String, {
    description: `Type: ${Object.keys(SettingTypes).join(",")}`,
  })
  type?: SettingTypes;

  @Field(() => String, {
    description: `Key`,
  })
  key?: string;

  @Field(() => GraphQLJSON, {
    description: `Value`,
  })
  value?: any;


  @Field(() => Boolean, {
    description: `Is Active`,
  })
  isActive?: boolean;

  @Field(() => Boolean, {
    description: `Is Private`,
  })
  isPrivate?: boolean;

  @Field(() => Boolean, {
    description: `Read only`,
  })
  readOnly?: boolean;

  @Field(() => ID, {
    description: `Group id`,
  })
  groupId?: string;

  @Field(() => Boolean, {
    description: `Edit Modes`,
  })
  editMode?: EditModes;
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
