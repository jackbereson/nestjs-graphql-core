import { Module } from '@nestjs/common';
import { SampleCaseService } from './sampleCase.service';
import { SampleCaseResolver } from './sampleCase.resolver';
import { SampleCaseProviders } from './sampleCase.model';

@Module({
    imports: [],
    providers: [
      SampleCaseResolver,
      SampleCaseService,
      ...SampleCaseProviders,
    ],
  })
export class SampleCaseModule {}