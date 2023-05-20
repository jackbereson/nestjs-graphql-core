import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventErrorInput {
  @Field(() => String, { description: 'Name' })
  name: string;
}