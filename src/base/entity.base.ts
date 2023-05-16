import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class Pagination {

  @Field(() => Int, { description: 'Limit' })
  limit?: number

  @Field(() => Int, { description: 'Offset' })
  offset?: number

  @Field(() => Int, { description: 'Current page' })
  page?: number

  @Field(() => Int, { description: 'Total' })
  total?: number
}


@ObjectType()
export class BaseSchema {
    @Field(() => String, { description: 'Address of user' })
    id?: any;

    @Field(() => Date, { description: 'Address of user' })
    createdAt?: Date;

    @Field(() => Date, { description: 'Address of user' })
    updatedAt?: Date;
};
