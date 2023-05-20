import { Inject, Injectable } from "@nestjs/common";
import { Model } from "../../base/model.base";
import { CounterService } from "../counter/counter.service";
import { IStudent } from "./entities/student.entity";

@Injectable()
export class StudentHelper {
  constructor(
    @Inject("STUDENT_MODEL")
    private studentModel?: Model<IStudent>,
    private counterService?: CounterService
  ) {}

  generateCode() {
    return this.counterService.trigger("student").then((c) => "STUDENT" + c);
  }
}
