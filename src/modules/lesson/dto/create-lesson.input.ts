import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateLessonInput {
  @Field(() => String, { description: "Name" })
  name: string;
}
