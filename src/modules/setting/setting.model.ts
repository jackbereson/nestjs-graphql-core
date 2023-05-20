import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum SettingStatus {
    ACTIVE = "ACTIVE",
    DEACTIVED = "DEACTIVED",
}

export const SettingModel = new Schema(
    {
        name: { type: String },
        status: { type: String, enum: SettingStatus, default: SettingStatus.ACTIVE },
    },
    { timestamps: true }
);

SettingModel.index(
    { name: "text" },
    { weights: { name: 1 } }
);

export const SettingProviders = [
    {
        provide: 'SETTING_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('Setting', SettingModel),
        inject: ['DATABASE_CONNECTION'],
    },
];