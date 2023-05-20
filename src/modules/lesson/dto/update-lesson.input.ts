import { InputType, Field, Int, PartialType, ID } from "@nestjs/graphql";
import { CreateLessonInput } from "./create-lesson.input";

@InputType()
export class UpdateLessonInput extends PartialType(CreateLessonInput) {
  @Field(() => ID)
  id: string;
}
