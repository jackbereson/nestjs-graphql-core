import { Test, TestingModule } from "@nestjs/testing";
import { CounterResolver } from "./counter.resolver";
import { CounterService } from "./counter.service";

describe("CounterResolver", () => {
  let resolver: CounterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounterResolver, CounterService],
    }).compile();

    resolver = module.get<CounterResolver>(CounterResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
