import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateSettingGroupInput } from './create-settingGroup.input';


@InputType()
export class UpdateSettingGroupInput extends PartialType(CreateSettingGroupInput) {
  @Field(() => ID)
  id: string;
}

