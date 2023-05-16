---
to: src/events/<%= h.inflection.camelize(name, true) %>.event.ts
---
import { Subject } from "rxjs";

export const <%= h.inflection.camelize(name) %> = new Subject<any>();

<%= h.inflection.camelize(name) %>.subscribe(async (payload) => {

});