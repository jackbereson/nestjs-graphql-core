import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema, Pagination } from '../../../base/entity.base';
import { BaseDocument } from '../../../base/model.base';
import { CounterStatus } from '../counter.model';

@ObjectType()
export class Counter extends BaseSchema {

  @Field(() => String, { description: 'Name' })
  name?: string

  @Field(() => String, { description: `Roles: ${Object.keys(CounterStatus).join(",")}` })
  status?: CounterStatus
}

@ObjectType()
export class CounterPageData {

  @Field(() => [Counter], { description: 'Counters', nullable: true })
  data?: Counter[]

  @Field(() => String, { description: 'Counter Total', nullable: true })
  total?: number

  @Field(() => Pagination, { description: 'Pagination', nullable: true })
  pagination?: Pagination
}


export type ICounter = BaseDocument & Counter