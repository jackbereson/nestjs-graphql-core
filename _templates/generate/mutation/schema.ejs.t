---
inject: true
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.schema.ts
before: Add Mutation
skip_if: <%= h.inflection.camelize(f) %>
---
    <%= h.inflection.camelize(f, true) %>: <%= h.inflection.camelize(name) %>