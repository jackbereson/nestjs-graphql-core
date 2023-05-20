import { CreateCustomerInput } from "./create-customer.input";
import { InputType, Field, Int, PartialType, ID } from "@nestjs/graphql";

@InputType()
export class UpdateCustomerInput extends PartialType(CreateCustomerInput) {
  @Field(() => ID)
  id: string;
}
