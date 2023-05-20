import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { LessonService } from "./lesson.service";
import { Lesson, LessonPageData } from "./entities/lesson.entity";
import { CreateLessonInput } from "./dto/create-lesson.input";
import { UpdateLessonInput } from "./dto/update-lesson.input";
import { QueryGetListInput } from "../../base/input.base";
import { ROLES, Roles } from "../../decorators/roles.decorator";
import { Ctx } from "../../decorators/ctx.decorator";
import { Context } from "../../auth/context";

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => LessonPageData)
  async getAllLesson(
    @Args("q") args: QueryGetListInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.lessonService.fetch(args);
  }

  @Query(() => Lesson)
  getOneLesson(
    @Args("id", { type: () => ID }) id: string,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.lessonService.findOne(id);
  }

  @Mutation(() => Lesson)
  createLesson(
    @Args("createLessonInput") args: CreateLessonInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.lessonService.create(args);
  }

  @Mutation(() => Lesson)
  updateLesson(
    @Args("updateLessonInput") args: UpdateLessonInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.lessonService.updateOne(args.id, args);
  }

  @Mutation(() => Lesson)
  @Roles(ROLES.ADMIN)
  removeLesson(
    @Args("id", { type: () => ID }) id: string,
    @Ctx() context: Context
  ) {
    return this.lessonService.remove(id);
  }
}
