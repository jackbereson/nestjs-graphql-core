import { Module } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { LessonResolver } from "./lesson.resolver";
import { LessonProviders } from "./lesson.model";

@Module({
  imports: [],
  providers: [LessonResolver, LessonService, ...LessonProviders],
})
export class LessonModule {}
