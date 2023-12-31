import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { SettingService } from "./setting.service";
import { Setting, SettingPageData } from "./entities/setting.entity";
import { CreateSettingInput } from "./dto/create-setting.input";
import { UpdateSettingInput } from "./dto/update-setting.input";
import { QueryGetListInput } from "../../base/input.base";
import {  Roles } from "../../decorators/roles.decorator";
import { Ctx } from "../../decorators/ctx.decorator";
import { Context } from "../../auth/context";
import { ROLES } from "../../constants/role.const";

@Resolver(() => Setting)
export class SettingResolver {
  constructor(private readonly settingService: SettingService) {}

  @Query(() => SettingPageData)
  async getAllSettings(
    @Args("q") args: QueryGetListInput,
    @Ctx() context: Context
  ) {
    // context.auth([ROLES.ADMIN]);
    return this.settingService.fetch(args);
  }

  @Query(() => Setting)
  getOneSetting(
    @Args("id", { type: () => ID }) id: string,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.settingService.findById(id);
  }

  @Mutation(() => Setting)
  createSetting(
    @Args("createSettingInput") args: CreateSettingInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.settingService.create(args);
  }

  @Mutation(() => Setting)
  updateSetting(
    @Args("updateSettingInput") args: UpdateSettingInput,
    @Ctx() context: Context
  ) {
    context.auth([ROLES.ADMIN]);
    return this.settingService.updateOne(args.id, args);
  }

  @Mutation(() => Setting)
  @Roles(ROLES.ADMIN)
  removeSetting(
    @Args("id", { type: () => ID }) id: string,
    @Ctx() context: Context
  ) {
    return this.settingService.remove(id);
  }
}
