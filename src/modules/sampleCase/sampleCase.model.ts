import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export enum SampleCaseStatus {
    ACTIVE = "ACTIVE",
    DEACTIVED = "DEACTIVED",
}

export const SampleCaseModel = new Schema(
    {
        name: { type: String },
        status: { type: String, enum: SampleCaseStatus, default: SampleCaseStatus.ACTIVE },
    },
    { timestamps: true }
);

SampleCaseModel.index(
    { name: "text" },
    { weights: { name: 1 } }
);

export const SampleCaseProviders = [
    {
        provide: 'SAMPLECASE_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('SampleCase', SampleCaseModel),
        inject: ['DATABASE_CONNECTION'],
    },
];