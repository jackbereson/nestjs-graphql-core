import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { CrudService } from "../../base/crud.base";
import { EventError, IEventError } from "./entities/eventError.entity";

@Injectable()
export class EventErrorService extends CrudService<Model<IEventError>> {
  constructor(
    @Inject("EVENTERROR_MODEL")
    private eventErrorModel: Model<IEventError>
  ) {
    super(eventErrorModel);
  }
}
