import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum ActivityStatus {
    ACTIVE = "ACTIVE",
    DEACTIVED = "DEACTIVED",
}

export const ActivityModel = new Schema(
    {
        name: { type: String },
        status: { type: String, enum: ActivityStatus, default: ActivityStatus.ACTIVE },
    },
    { timestamps: true }
);

ActivityModel.index(
    { address: "text", addressIp: "text" },
    { weights: { address: 2, addressIp: 3 } }
);

export const ActivityProviders = [
    {
        provide: 'ACTIVITY_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('Activity', ActivityModel),
        inject: ['DATABASE_CONNECTION'],
    },
];