import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum CounterStatus {
    ACTIVE = "ACTIVE",
    DEACTIVED = "DEACTIVED",
}

export const CounterModel = new Schema(
    {
        name: { type: String },
        status: { type: String, enum: CounterStatus, default: CounterStatus.ACTIVE },
    },
    { timestamps: true }
);

CounterModel.index(
    { address: "text", addressIp: "text" },
    { weights: { address: 2, addressIp: 3 } }
);

export const CounterProviders = [
    {
        provide: 'COUNTER_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('Counter', CounterModel),
        inject: ['DATABASE_CONNECTION'],
    },
];