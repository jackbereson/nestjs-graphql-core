import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateEventErrorInput } from './create-eventError.input';


@InputType()
export class UpdateEventErrorInput extends PartialType(CreateEventErrorInput) {
  @Field(() => ID)
  id: string;
}

