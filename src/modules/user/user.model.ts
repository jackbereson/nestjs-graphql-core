import mongoose from "mongoose";
import { ROLES } from "../../constants/role.const";
const Schema = mongoose.Schema;

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DEACTIVED = "DEACTIVED",
}

export const UserModel = new Schema(
  {
    code: { type: String, unique: true },
    name: { type: String },
    email: { type: String },
    password: { type: String },
    walletAddress: { type: String },
    role: { type: String, enum: ROLES, default: ROLES.ADMIN },
    avatar: { type: String },
    lastLoginAt: { type: Date },
    activedAt: { type: Date },
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
