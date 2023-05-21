import { INestApplication } from "@nestjs/common";
import { SettingService } from "../modules/setting/setting.service";
import { UserService } from "../modules/user/user.service";

const initAllData = async (app:INestApplication) => {
    const userService: UserService = app.get(UserService);
    await userService.initNewUser();

    const settingService: SettingService = app.get(SettingService);
    await settingService.seedSetting();
}

export default initAllData;