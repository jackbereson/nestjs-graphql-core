import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum SettingGroupStatus {
    ACTIVE = "ACTIVE",
    DEACTIVED = "DEACTIVED",
}

export const SettingGroupModel = new Schema(
    {
        name: { type: String },
        status: { type: String, enum: SettingGroupStatus, default: SettingGroupStatus.ACTIVE },
    },
    { timestamps: true }
);

SettingGroupModel.index(
    { name: "text" },
    { weights: { name: 1 } }
);

export const SettingGroupProviders = [
    {
        provide: 'SETTINGGROUP_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('SettingGroup', SettingGroupModel),
        inject: ['DATABASE_CONNECTION'],
    },
];