import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateCounterInput {
  @Field(() => String, { description: "Name" })
  name: string;
}
