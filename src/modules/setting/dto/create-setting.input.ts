import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateSettingInput {
  @Field(() => String, { description: "Name" })
  name: string;
}
