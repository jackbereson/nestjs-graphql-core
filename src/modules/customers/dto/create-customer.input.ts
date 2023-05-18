import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { description: 'Username' })
  username: string;
  @Field(() => String, { description: 'Email' })
  email: string;
  @Field(() => String, { description: 'Address' })
  address: string;
}
