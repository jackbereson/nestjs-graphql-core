import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SigninUserInput {
  @Field(() => String, { description: "Email" })
  email: string;

  @Field(() => String, { description: "Password" })
  password: string;
}
