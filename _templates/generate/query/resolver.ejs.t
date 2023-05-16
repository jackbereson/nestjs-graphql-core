---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/resolvers/<%= h.inflection.camelize(f, true) %>.resolver.ts
---
import { Context } from "../../../context";

const Query = {
  <%= h.inflection.camelize(f, true) %>: async (root: any, args: any, context: Context) => {},
};

export default { Query };
