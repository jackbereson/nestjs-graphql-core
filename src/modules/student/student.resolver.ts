import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { StudentService } from "./student.service";
import { Student, StudentPageData } from "./entities/student.entity";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";
import { QueryGetListInput } from "../../base/input.base";
import { ROLES, Roles } from "../../decorators/roles.decorator";
import { Ctx } from "../../decorators/ctx.decorator";
import { Context } from "../../auth/context";

@Resolver(() => Student)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => StudentPageData)
  async getAllStudent(
    @Args("q") args: QueryGetListInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.studentService.fetch(args);
  }

  @Query(() => Student)
  getOneStudent(
    @Args("id", { type: () => ID }) id: string,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.studentService.findOne(id);
  }

  @Mutation(() => Student)
  createStudent(
    @Args("createStudentInput") args: CreateStudentInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.studentService.create(args);
  }

  @Mutation(() => Student)
  updateStudent(
    @Args("updateStudentInput") args: UpdateStudentInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.studentService.updateOne(args.id, args);
  }

  @Mutation(() => Student)
  @Roles(ROLES.ADMIN)
  removeStudent(
    @Args("id", { type: () => ID }) id: string,
    @Ctx() context: Context
  ) {
    return this.studentService.remove(id);
  }
}
