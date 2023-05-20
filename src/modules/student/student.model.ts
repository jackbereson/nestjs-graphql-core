import mongoose from "mongoose";

export const student = "Student";

const Schema = mongoose.Schema;

export enum UserStatus {
  ACTIVE,
  DEACTIVED,
}

export const StudentModel = new Schema(
  {
    name: { type: String },
    age: { type: Number },
    status: { type: String, enum: UserStatus, default: UserStatus.ACTIVE },
    parentRefId: { type: Schema.Types.ObjectId, ref: student },
  },
  { timestamps: true }
);

StudentModel.index({ name: "text" }, { weights: { name: 1 } });

export const StudentProviders = [
  {
    provide: "STUDENT_MODEL",
    useFactory: (connection: mongoose.Connection) =>
      connection.model(student, StudentModel),
    inject: ["DATABASE_CONNECTION"],
  },
];
