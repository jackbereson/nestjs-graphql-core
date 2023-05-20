import { InputType, Field, Int, PartialType, ID } from "@nestjs/graphql";
import { CreateActivityInput } from "./create-activity.input";

@InputType()
export class UpdateActivityInput extends PartialType(CreateActivityInput) {
  @Field(() => ID)
  id: string;
}
