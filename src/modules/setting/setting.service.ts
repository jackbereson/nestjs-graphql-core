import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { CrudService } from "../../base/crud.base";
import { Setting, ISetting } from "./entities/setting.entity";

@Injectable()
export class SettingService extends CrudService<Model<ISetting>> {
  constructor(
    @Inject("SETTING_MODEL")
    private settingModel: Model<ISetting>
  ) {
    super(settingModel);
  }
}
