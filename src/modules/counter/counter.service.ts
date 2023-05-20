import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../../base/crud.base';
import { Counter , ICounter } from './entities/counter.entity';

@Injectable()
export class CounterService extends CrudService<Model<ICounter>> {
  initedCodes: string[] = [];
  constructor(
    @Inject('COUNTER_MODEL')
    private counterModel: Model<ICounter>
  ) {
    super(counterModel);
  }

  async trigger(name: string, initValue: number = 999999999, step = 1) {
    if (!this.initedCodes.includes(name)) {
      await this.counterModel.updateOne(
        { name },
        { $setOnInsert: { value: initValue } },
        { upsert: true }
      );
      this.initedCodes.push(name);
    }

    const counter = await this.counterModel.findOne({ name });
    return await this.counterModel.findByIdAndUpdate(
      counter.id,
      { $inc: { value: step } },
      { new: true }
    ).then((res) => res.value);
  }
}
