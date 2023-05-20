import { BaseEvent } from "../base/baseEvent";
import { EventErrorTypeEnum } from "../constants/event.const";
import { AsyncFunction } from "async";
import { ErrorHelper } from "../helpers/error.helper";

interface Example {
  settings: any[];
}
class ExampleEvent extends BaseEvent<Example> {
  constructor() {
    super();
  }

  async parseData(data: any) {}

  async toJSON(data: any) {
    return data;
  }
}

const exampleEvent = new ExampleEvent();

exampleEvent.regisRule(EventErrorTypeEnum.example_1, async (data: Example) => {
  console.log("funcExample1");
});

exampleEvent.regisRule(EventErrorTypeEnum.example_2, async (data: Example) => {
  console.log("ERROR");
  throw ErrorHelper.createUserError("Error ????");
});

export { exampleEvent };
