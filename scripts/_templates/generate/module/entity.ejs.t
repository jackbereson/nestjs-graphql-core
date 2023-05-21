---
to: ../src/modules/<%= h.inflection.camelize(name, true) %>/entities/<%= h.inflection.camelize(name, true) %>.entity.ts
---
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema, Pagination } from '../../../base/entity.base';
import { BaseDocument } from '../../../base/model.base';
import { <%= h.inflection.camelize(name) %>Status } from '../<%= h.inflection.camelize(name, true) %>.model';

@ObjectType()
export class <%= h.inflection.camelize(name) %> extends BaseSchema {

  @Field(() => String, { description: 'Name' })
  name?: string

  @Field(() => String, { description: `Status: ${Object.keys(<%= h.inflection.camelize(name) %>Status).join(",")}` })
  status?: <%= h.inflection.camelize(name) %>Status
}

@ObjectType()
export class <%= h.inflection.camelize(name) %>PageData {

  @Field(() => [<%= h.inflection.camelize(name) %>], { description: '<%= h.inflection.camelize(name) %>s', nullable: true })
  data?: <%= h.inflection.camelize(name) %>[]

  @Field(() => String, { description: '<%= h.inflection.camelize(name) %> Total', nullable: true })
  total?: number

  @Field(() => Pagination, { description: 'Pagination', nullable: true })
  pagination?: Pagination
}


export type I<%= h.inflection.camelize(name) %> = BaseDocument & <%= h.inflection.camelize(name) %>