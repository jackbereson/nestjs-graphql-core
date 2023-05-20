import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateSettingInput } from './create-setting.input';


@InputType()
export class UpdateSettingInput extends PartialType(CreateSettingInput) {
  @Field(() => ID)
  id: string;
}

