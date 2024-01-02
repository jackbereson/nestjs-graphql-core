import mongoose from "mongoose";
const Schema = mongoose.Schema;

export enum ActivityStatus {
  ACTIVED = "ACTIVED",
  DEACTIVATED = "DEACTIVATED",
}

export const ActivityModel = new Schema(
  {
    name: { type: String },
    status: {
      type: String,
      enum: ActivityStatus,
      default: ActivityStatus.ACTIVED,
    },
  },
  { timestamps: true }
);

ActivityModel.index({ name: "text" }, { weights: { name: 1 } });

export const ActivityProviders = [
  {
    provide: "ACTIVITY_MODEL",
    useFactory: (connection: mongoose.Connection) =>
      connection.model("Activity", ActivityModel),
    inject: ["DATABASE_CONNECTION"],
  },
];
