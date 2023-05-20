import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum EventErrorStatus {
    ACTIVE = "ACTIVE",
    DEACTIVED = "DEACTIVED",
}

export const EventErrorModel = new Schema(
    {
        name: { type: String },
        status: { type: String, enum: EventErrorStatus, default: EventErrorStatus.ACTIVE },
    },
    { timestamps: true }
);

EventErrorModel.index(
    { name: "text" },
    { weights: { name: 1 } }
);

export const EventErrorProviders = [
    {
        provide: 'EVENTERROR_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('EventError', EventErrorModel),
        inject: ['DATABASE_CONNECTION'],
    },
];