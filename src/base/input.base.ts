import { InputType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class QueryGetListInput {
    @Field(() => Int, { nullable: true })
    limit?: number;

    @Field(() => Int, { nullable: true })
    offset?: number;

    @Field(() => Int, { nullable: true })
    page?: number;

    @Field(() => GraphQLJSONObject, { nullable: true })
    order?: any;

    @Field(() => GraphQLJSONObject, { nullable: true })
    filter?: any;
}