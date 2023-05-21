import { Model } from "mongoose";
import { Injectable, Inject, Logger } from "@nestjs/common";
import { CrudService } from "../../base/crud.base";
import { ISetting } from "./entities/setting.entity";
import { SettingGroupService } from "../settingGroup/settingGroup.service";
import { SETTING_DATA } from "../../configs/settingData";

@Injectable()
export class SettingService extends CrudService<Model<ISetting>> {
  constructor(
    @Inject("SETTING_MODEL")
    private settingModel: Model<ISetting>,

    @Inject(SettingGroupService)
    private settingGroupService: SettingGroupService
  ) {
    super(settingModel);
  }


  async seedSetting() {
    new Logger("Nest Init").verbose(
      "⛳ Init Settings: STARTED"
    );
    const settingGroups = await this.settingGroupService.model.find();
    const settings = await this.model.find();
    for (const GROUP of SETTING_DATA) {
      let settingGroup = settingGroups.find((g: any) => g.slug == GROUP.slug);
      if (!settingGroup) {
        new Logger("Nest Init").verbose(
          `|_ Setting Group: Add new ${GROUP.name}`
        );
        settingGroup = await this.settingGroupService.model.create({
          slug: GROUP.slug,
          name: GROUP.name,
          desc: GROUP.desc,
          icon: GROUP.icon,
          readOnly: GROUP.readOnly,
          // settingIds: [],
        });
      }
      for (const SETTING of GROUP.settings) {
        // console.log("SETTING.key", SETTING.key);
        let setting = settings.find((s: any) => s.key == SETTING.key);
        if (!setting) {
          new Logger("Nest Init").verbose(
            `|_ Add new setting :  ${SETTING.name}`
          );
          setting = await this.model.create({
            ...SETTING,
            groupId: settingGroup._id.toString(),
          });
          //settingGroup.settingIds.push(setting._id);
        }
        //SettingKeyLoader.prime(setting.key, setting);
      }
      await settingGroup.save().then(res=>{
        new Logger("Nest Init").verbose(
          `|_ Setting Group: Updated ${GROUP.name}`
        );
      });
    }
  }
}
