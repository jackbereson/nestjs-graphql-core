import mongoose from "mongoose";
const Schema = mongoose.Schema;

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DEACTIVED = "DEACTIVED",
}

export const UserModel = new Schema(
  {
    name: { type: String },
    status: { type: String, enum: UserStatus, default: UserStatus.ACTIVE },
  },
  { timestamps: true }
);

UserModel.index({ name: "text" }, { weights: { name: 1 } });

export const UserProviders = [
  {
    provide: "USER_MODEL",
    useFactory: (connection: mongoose.Connection) =>
      connection.model("User", UserModel),
    inject: ["DATABASE_CONNECTION"],
  },
];
