---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.model.ts
---
import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database.loader";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type I<%= h.inflection.camelize(name) %> = BaseDocument & {
  name?: string;
};

const <%= h.inflection.camelize(name, true) %>Schema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

// <%= h.inflection.camelize(name, true) %>Schema.index({ name: "text" }, { weights: { name: 2 } });

export const <%= h.inflection.camelize(name) %>Hook = new ModelHook<I<%= h.inflection.camelize(name) %>>(<%= h.inflection.camelize(name, true) %>Schema);
export const <%= h.inflection.camelize(name) %>Model: mongoose.Model<I<%= h.inflection.camelize(name) %>> = MainConnection.model(
  "<%= h.inflection.camelize(name) %>",
  <%= h.inflection.camelize(name, true) %>Schema
);

export const <%= h.inflection.camelize(name) %>Loader = ModelLoader<I<%= h.inflection.camelize(name) %>>(<%= h.inflection.camelize(name) %>Model, <%= h.inflection.camelize(name) %>Hook);
