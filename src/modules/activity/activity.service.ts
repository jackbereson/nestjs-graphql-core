import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { CrudService } from "../../base/crud.base";
import { Activity, IActivity } from "./entities/activity.entity";

@Injectable()
export class ActivityService extends CrudService<Model<IActivity>> {
  constructor(
    @Inject("ACTIVITY_MODEL")
    private activityModel?: Model<IActivity>
  ) {
    super(activityModel);
  }
}
