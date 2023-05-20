---
to: ../src/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.helper.ts
---
import { Inject, Injectable } from "@nestjs/common";
import { Model } from "../../base/model.base";
import { CounterService } from "../counter/counter.service";
import { I<%= h.inflection.camelize(name) %> } from "./entities/<%= h.inflection.camelize(name, true) %>.entity";

@Injectable()
export class <%= h.inflection.camelize(name) %>Helper {
  constructor(
    @Inject('<%= h.changeCase.upper(name) %>_MODEL')
    private <%= h.inflection.camelize(name, true) %>Model?: Model<I<%= h.inflection.camelize(name) %>>,
    private counterService?: CounterService
  ) {
  }

  generateCode() {
    return this.counterService.trigger("<%= h.inflection.camelize(name, true) %>").then((c) => "<%= h.changeCase.upper(name) %>" + c);
  }
}
