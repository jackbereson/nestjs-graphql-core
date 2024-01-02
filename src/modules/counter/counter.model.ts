import mongoose from "mongoose";
const Schema = mongoose.Schema;

export enum CounterStatus {
  ACTIVED = "ACTIVED",
  DEACTIVATED = "DEACTIVATED",
}

export const CounterModel = new Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Number, default: 0 },
    status: {
      type: String,
      enum: CounterStatus,
      default: CounterStatus.ACTIVED,
    },
  },
  { timestamps: true }
);

CounterModel.index({ name: "text" }, { weights: { address: 2 } });

export const CounterProviders = [
  {
    provide: "COUNTER_MODEL",
    useFactory: (connection: mongoose.Connection) =>
      connection.model("Counter", CounterModel),
    inject: ["DATABASE_CONNECTION"],
  },
];
