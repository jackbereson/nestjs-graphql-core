import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateActivityInput {
  @Field(() => String, { description: 'Name' })
  name: string;
}