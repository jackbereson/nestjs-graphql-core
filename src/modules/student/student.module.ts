import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentResolver } from "./student.resolver";
import { StudentProviders } from "./student.model";

@Module({
  imports: [],
  providers: [StudentResolver, StudentService, ...StudentProviders],
})
export class StudentModule {}
