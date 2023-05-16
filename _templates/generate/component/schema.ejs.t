---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.schema.ts
---
import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAll<%= h.inflection.camelize(name) %>(q: QueryGetListInput): <%= h.inflection.camelize(name) %>PageData
    getOne<%= h.inflection.camelize(name) %>(id: ID!): <%= h.inflection.camelize(name) %>
    # Add Query
  }

  extend type Mutation {
    create<%= h.inflection.camelize(name) %>(data: Create<%= h.inflection.camelize(name) %>Input!): <%= h.inflection.camelize(name) %>
    update<%= h.inflection.camelize(name) %>(id: ID!, data: Update<%= h.inflection.camelize(name) %>Input!): <%= h.inflection.camelize(name) %>
    deleteOne<%= h.inflection.camelize(name) %>(id: ID!): <%= h.inflection.camelize(name) %>
    # Add Mutation
  }

  input Create<%= h.inflection.camelize(name) %>Input {
    name: String
  }

  input Update<%= h.inflection.camelize(name) %>Input {
    name: String
  }

  type <%= h.inflection.camelize(name) %> {
    id: String    
    createdAt: DateTime
    updatedAt: DateTime

    name: String
  }

  type <%= h.inflection.camelize(name) %>PageData {
    data: [<%= h.inflection.camelize(name) %>]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
