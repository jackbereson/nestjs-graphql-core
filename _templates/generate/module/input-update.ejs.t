---
to: src/modules/<%= h.inflection.camelize(name, true) %>/dto/update-<%= h.inflection.camelize(name, true) %>.input.ts
---
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { Create<%= h.inflection.camelize(name) %>Input } from './create-<%= h.inflection.camelize(name, true) %>.input';


@InputType()
export class Update<%= h.inflection.camelize(name) %>Input extends PartialType(Create<%= h.inflection.camelize(name) %>Input) {
  @Field(() => ID)
  id: string;
}

