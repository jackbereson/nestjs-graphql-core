import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateSampleCaseInput } from './create-sample-case.input';


@InputType()
export class UpdateSampleCaseInput extends PartialType(CreateSampleCaseInput) {
  @Field(() => ID)
  id: string;
}

