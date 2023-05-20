import { Model } from "mongoose";
import { Injectable, Inject } from "@nestjs/common";
import { CrudService } from "../../base/crud.base";
import { SettingGroup, ISettingGroup } from "./entities/settingGroup.entity";

@Injectable()
export class SettingGroupService extends CrudService<Model<ISettingGroup>> {
  constructor(
    @Inject("SETTINGGROUP_MODEL")
    private settingGroupModel: Model<ISettingGroup>
  ) {
    super(settingGroupModel);
  }
}
