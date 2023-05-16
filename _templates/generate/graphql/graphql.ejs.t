---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(f, true) %>.graphql.ts
---
import { gql } from "apollo-server-express";
import { Context } from "../../context";

export default {
  schema: gql`
    extend type Query {
      <%= h.inflection.camelize(f, true) %>: Mixed
    }
  `,
  resolver: {
    Query: {
      <%= h.inflection.camelize(f, true) %>: async (root: any, args: any, context: Context) => {
      }
    },
  },
};
