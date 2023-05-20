import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { CrudService } from "../../base/crud.base";
import { Lesson, ILesson } from "./entities/lesson.entity";

@Injectable()
export class LessonService extends CrudService<Model<ILesson>> {
  constructor(
    @Inject("LESSON_MODEL")
    private lessonModel: Model<ILesson>
  ) {
    super(lessonModel);
  }
}
