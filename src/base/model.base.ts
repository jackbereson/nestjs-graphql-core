import { Field, ObjectType } from "@nestjs/graphql";
import mongoose from "mongoose";
import { Subject } from "rxjs";

export class BaseDocument extends mongoose.Document {
    createdAt?: Date;
    updatedAt?: Date;
};

export type Model<T extends BaseDocument> = mongoose.Model<T>;

export class ModelHook<T> {
    public onSaved = new Subject<T>();
    public onUpdated = new Subject();
    public onDeleted = new Subject<T>();
    public onFindOne = new Subject<T>();
    constructor(schema: mongoose.Schema) {
        schema.post("findOne", (doc: any, next) => {
            if (doc) this.onFindOne.next(doc);
            next(null);
        });
        schema.post("save", (doc: any, next) => {
            if (doc) this.onSaved.next(doc);
            next();
        });
        schema.post("updateOne", (doc: any, next) => {
            if (doc) this.onUpdated.next(doc);
            next();
        });
        schema.post("deleteOne", (doc: any, next) => {
            if (doc) this.onUpdated.next(doc);
            next();
        });
    }
}
