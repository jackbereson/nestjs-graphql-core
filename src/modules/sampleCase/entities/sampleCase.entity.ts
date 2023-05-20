import { ObjectType, Field } from '@nestjs/graphql';
import { BaseSchema, Pagination } from '../../../base/entity.base';
import { BaseDocument } from '../../../base/model.base';
import { SampleCaseStatus } from '../sampleCase.model';

@ObjectType()
export class SampleCase extends BaseSchema {

  @Field(() => String, { description: 'Name' })
  name?: string

  @Field(() => String, { description: `Roles: ${Object.keys(SampleCaseStatus).join(",")}` })
  status?: SampleCaseStatus
}

@ObjectType()
export class SampleCasePageData {

  @Field(() => [SampleCase], { description: 'SampleCases', nullable: true })
  data?: SampleCase[]

  @Field(() => String, { description: 'SampleCase Total', nullable: true })
  total?: number

  @Field(() => Pagination, { description: 'Pagination', nullable: true })
  pagination?: Pagination
}


export type ISampleCase = BaseDocument & SampleCase