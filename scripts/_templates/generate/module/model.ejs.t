---
to: ../src/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.model.ts
---
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum <%= h.inflection.camelize(name) %>Status {
    ACTIVED = "ACTIVED",
    DEACTIVATED = "DEACTIVATED",
}

export const <%= h.inflection.camelize(name) %>Model = new Schema(
    {
        name: { type: String },
        status: { type: String, enum: <%= h.inflection.camelize(name) %>Status, default: <%= h.inflection.camelize(name) %>Status.ACTIVED },
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
        useFactory: (connection: mongoose.Connection) => connection.model('<%= h.inflection.camelize(name) %>', <%= h.inflection.camelize(name) %>Model),
        inject: ['DATABASE_CONNECTION'],
    },
];