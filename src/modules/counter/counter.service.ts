import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../../base/crud.base';
import { Counter , ICounter } from './entities/counter.entity';

@Injectable()
export class CounterService extends CrudService<Model<ICounter>> {

  constructor(
    @Inject('COUNTER_MODEL')
    private counterModel: Model<ICounter>
  ) {
    super(counterModel);
  }
}
