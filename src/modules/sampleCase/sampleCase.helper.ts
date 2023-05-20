import { Inject, Injectable } from "@nestjs/common";
import { Model } from "../../base/model.base";
import { CounterService } from "../counter/counter.service";
import { ISampleCase } from "./entities/sampleCase.entity";

@Injectable()
export class SampleCaseHelper {
  constructor(
    @Inject('SAMPLECASE_MODEL')
    private sampleCaseModel?: Model<ISampleCase>,
    private counterService?: CounterService
  ) {
  }

  generateCode() {
    return this.counterService.trigger("sampleCase").then((c) => "SAMPLECASE" + c);
  }
}
