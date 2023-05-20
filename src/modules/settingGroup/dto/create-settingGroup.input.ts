import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateSettingGroupInput {
  @Field(() => String, { description: "Name" })
  name: string;
}
