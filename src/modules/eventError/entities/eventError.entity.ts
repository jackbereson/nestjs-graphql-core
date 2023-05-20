import { ObjectType, Field } from "@nestjs/graphql";
import { BaseSchema, Pagination } from "../../../base/entity.base";
import { BaseDocument } from "../../../base/model.base";
import { EventErrorStatus } from "../eventError.model";

@ObjectType()
export class EventError extends BaseSchema {
  @Field(() => String, { description: "Name" })
  name?: string;

  @Field(() => String, {
    description: `Roles: ${Object.keys(EventErrorStatus).join(",")}`,
  })
  status?: EventErrorStatus;
}

@ObjectType()
export class EventErrorPageData {
  @Field(() => [EventError], { description: "EventErrors", nullable: true })
  data?: EventError[];

  @Field(() => String, { description: "EventError Total", nullable: true })
  total?: number;

  @Field(() => Pagination, { description: "Pagination", nullable: true })
  pagination?: Pagination;
}

export type IEventError = BaseDocument & EventError;
