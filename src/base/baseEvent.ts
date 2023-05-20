import { AsyncFunction } from "async";
import { Subject } from "rxjs";
import { EventErrorTypeEnum } from "../constants/event.const";

interface MapEvent<T> {
  [name: string]: {
    event: BaseEvent<T>;
    func: Function;
  };
}

export abstract class BaseEvent<T> {
  static mapEvent: MapEvent<any> = {};

  constructor() {}
  private subject = new Subject<T>();

  next(data: T) {
    this.subject.next(data);
  }

  regisRule(type: EventErrorTypeEnum, func: Function) {
    BaseEvent.mapEvent[type] = {
      event: this,
      func,
    };
    this.subject.subscribe((data) => {
      this.exec(func, data, type);
    });
  }

  async exec(func: Function, data: any, type: EventErrorTypeEnum) {
    try {
      await func(data);
    } catch (error) {
      await this.onError(error, type, data);
    }
  }

  async onError(error: any, type: EventErrorTypeEnum, data: any) {
    // Logger.error(error.toString(), {
    //   metadata: {
    //     stack: error.stack,
    //     name: error.name,
    //     message: error.message,
    //   },
    // });
    // EventErrorModel.create({
    //   type: type,
    //   errorStack: error.stack,
    //   errorName: error.name,
    //   errorMessage: error.message,
    //   data: await this.toJSON(data),
    // });
  }

  async parseData(data: any) {
    return data;
  }
  async toJSON(data: any) {
    return data;
  }
  static async resolve(type: EventErrorTypeEnum, data: any) {
    const event = BaseEvent.mapEvent[type];

    try {
      await event.func(data);
    } catch (error) {
      await event.event.onError(error, type, data);
    }
  }
}
