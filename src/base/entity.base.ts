import { Field, ID, Int, ObjectType } from "@nestjs/graphql"

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
    @Field(() => ID, { description: 'Id' })
    id?: any;

    @Field(() => Date, { description: 'Created At' })
    createdAt?: Date;

    @Field(() => Date, { description: 'Updated At' })
    updatedAt?: Date;
};
