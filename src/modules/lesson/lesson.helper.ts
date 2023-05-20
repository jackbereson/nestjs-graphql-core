import { Inject, Injectable } from "@nestjs/common";
import { Model } from "../../base/model.base";
import { CounterService } from "../counter/counter.service";
import { ILesson } from "./entities/lesson.entity";

@Injectable()
export class LessonHelper {
  constructor(
    @Inject("LESSON_MODEL")
    private lessonModel?: Model<ILesson>,
    private counterService?: CounterService
  ) {}

  generateCode() {
    return this.counterService.trigger("lesson").then((c) => "LESSON" + c);
  }
}
