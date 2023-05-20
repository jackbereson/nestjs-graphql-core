import { Test, TestingModule } from '@nestjs/testing';
import { SampleCaseResolver } from './sampleCase.resolver';
import { SampleCaseService } from './sampleCase.service';

describe('SampleCaseResolver', () => {
  let resolver: SampleCaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleCaseResolver, SampleCaseService],
    }).compile();

    resolver = module.get<SampleCaseResolver>(SampleCaseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
