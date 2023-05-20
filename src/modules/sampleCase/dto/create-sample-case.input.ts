import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSampleCaseInput {
  @Field(() => String, { description: 'Name' })
  name: string;
}