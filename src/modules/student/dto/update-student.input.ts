import { InputType, Field, Int, PartialType, ID } from "@nestjs/graphql";
import { CreateStudentInput } from "./create-student.input";

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field(() => ID)
  id: string;
}
