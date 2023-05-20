import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateCounterInput } from './create-counter.input';


@InputType()
export class UpdateCounterInput extends PartialType(CreateCounterInput) {
  @Field(() => ID)
  id: string;
}

