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
    { address: "text", addressIp: "text" },
    { weights: { address: 2, addressIp: 3 } }
);

export const SettingGroupProviders = [
    {
        provide: 'SETTINGGROUP_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('SettingGroup', SettingGroupModel),
        inject: ['DATABASE_CONNECTION'],
    },
];