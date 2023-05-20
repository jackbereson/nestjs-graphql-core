import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateStudentInput {
  @Field(() => String, { description: "Name" })
  name: string;
}
