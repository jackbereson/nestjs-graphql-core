---
to: ../src/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.model.ts
---
import mongoose from 'mongoose';

export const <%= h.inflection.camelize(name, true) %> = '<%= h.inflection.camelize(name) %>'

const Schema = mongoose.Schema;

<%= enums %>

export const <%= h.inflection.camelize(name) %>Model = new Schema(
    {
        <%= fields %>
    },
    { timestamps: true }
);

<%= h.inflection.camelize(name) %>Model.index(
    { name: "text" },
    { weights: { name: 1 } }
);

export const <%= h.inflection.camelize(name) %>Providers = [
    {
        provide: '<%= h.changeCase.upper(name) %>_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model(<%= h.inflection.camelize(name, true) %>, <%= h.inflection.camelize(name) %>Model),
        inject: ['DATABASE_CONNECTION'],
    },
];