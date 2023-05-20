import { ObjectType, Field, Int, Float } from "@nestjs/graphql";
import { BaseSchema, Pagination } from "../../../base/entity.base";
import { BaseDocument } from "../../../base/model.base";

@ObjectType()
export class Student extends BaseSchema {
  @Field(function () {
    return String;
  })
  name?: string;

  @Field(function () {
    return Int;
  })
  age?: number;

  @Field(function () {
    return String;
  })
  status?: string;
}

@ObjectType()
export class StudentPageData {
  @Field(() => [Student], { description: "Students", nullable: true })
  data?: Student[];

  @Field(() => String, { description: "Student Total", nullable: true })
  total?: number;

  @Field(() => Pagination, { description: "Pagination", nullable: true })
  pagination?: Pagination;
}

export type IStudent = BaseDocument & Student;
