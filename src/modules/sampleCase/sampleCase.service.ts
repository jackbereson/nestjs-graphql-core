import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../../base/crud.base';
import { SampleCase , ISampleCase } from './entities/sampleCase.entity';

@Injectable()
export class SampleCaseService extends CrudService<Model<ISampleCase>> {

  constructor(
    @Inject('SAMPLECASE_MODEL')
    private sampleCaseModel: Model<ISampleCase>
  ) {
    super(sampleCaseModel);
  }
}
