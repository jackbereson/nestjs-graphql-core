import { Test, TestingModule } from '@nestjs/testing';
import { SampleCaseService } from './sampleCase.service';

describe('SampleCaseService', () => {
  let service: SampleCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleCaseService],
    }).compile();

    service = module.get<SampleCaseService>(SampleCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
