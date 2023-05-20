---
to: src/modules/<%= h.inflection.camelize(name, true) %>/dto/create-<%= h.changeCase.paramCase(name, true) %>.input.ts
---
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class Create<%= h.inflection.camelize(name) %>Input {
  @Field(() => String, { description: 'Name' })
  name: string;
}