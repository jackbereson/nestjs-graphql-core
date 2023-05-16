---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.service.ts
---
import { CrudService } from "../../../base/crudService";
import { <%= h.inflection.camelize(name) %>Model } from "./<%= h.inflection.camelize(name, true) %>.model";
class <%= h.inflection.camelize(name) %>Service extends CrudService<typeof <%= h.inflection.camelize(name) %>Model> {
  constructor() {
    super(<%= h.inflection.camelize(name) %>Model);
  }
}

const <%= h.inflection.camelize(name, true) %>Service = new <%= h.inflection.camelize(name) %>Service();

export { <%= h.inflection.camelize(name, true) %>Service };
