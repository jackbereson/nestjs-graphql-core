import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { CrudService } from "../../base/crud.base";
import { Student, IStudent } from "./entities/student.entity";

@Injectable()
export class StudentService extends CrudService<Model<IStudent>> {
  constructor(
    @Inject("STUDENT_MODEL")
    private studentModel: Model<IStudent>
  ) {
    super(studentModel);
  }
}
