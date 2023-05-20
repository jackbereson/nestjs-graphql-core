import { Test, TestingModule } from "@nestjs/testing";
import { LessonResolver } from "./lesson.resolver";
import { LessonService } from "./lesson.service";

describe("LessonResolver", () => {
  let resolver: LessonResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonResolver, LessonService],
    }).compile();

    resolver = module.get<LessonResolver>(LessonResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
