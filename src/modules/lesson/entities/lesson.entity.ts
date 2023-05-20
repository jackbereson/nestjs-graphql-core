import { ObjectType, Field, Int, Float, ID } from "@nestjs/graphql";
import { BaseSchema, Pagination } from "../../../base/entity.base";
import { BaseDocument } from "../../../base/model.base";

@ObjectType()
export class Lesson extends BaseSchema {
  @Field(function () {
    return String;
  })
  name?: string;

  @Field(function () {
    return Int;
  })
  age?: number;

  @Field(function () {
    return ID;
  })
  studentId?: string;
}

@ObjectType()
export class LessonPageData {
  @Field(() => [Lesson], { description: "Lessons", nullable: true })
  data?: Lesson[];

  @Field(() => String, { description: "Lesson Total", nullable: true })
  total?: number;

  @Field(() => Pagination, { description: "Pagination", nullable: true })
  pagination?: Pagination;
}

export type ILesson = BaseDocument & Lesson;
