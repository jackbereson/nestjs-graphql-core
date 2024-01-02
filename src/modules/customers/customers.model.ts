import mongoose from "mongoose";
import { ROLES } from "../../constants/role.const";
const Schema = mongoose.Schema;

export enum CustomerStatus {
  ACTIVED = "ACTIVED",
  DEACTIVATED = "DEACTIVATED",
}

export enum CustomerWalletTypes {
  METAMASK = "METAMASK",
  C98 = "C98",
  MATH = "MATH",
  BINANCE_CHAIN = "BINANCE_CHAIN",
  BITKEEP = "BITKEEP",
  WALLETCONNECT = "WALLETCONNECT",
  COINBASE = "COINBASE",
}

export const customerWalletTypeData = [
  "METAMASK",
  "TRUST",
  "MATH",
  "WALLETCONNECT",
  "BINANCE_CHAIN",
  "COINBASE",
  "BITKEEP",
];

export const CustomerModel = new Schema(
  {
    username: { type: String },
    address: { type: String }, // dia chi vi
    accountId: { type: String },
    balance: { type: Number, default: 0 }, // so du vi

    walletType: { type: String, enum: CustomerWalletTypes },
    email: { type: String },
    verifyCode: { type: String },
    activedAt: { type: Date },
    referral: { type: String },
    shortUrl: { type: String },
    role: { type: String, default: ROLES.CUSTOMER },
    nonce: { type: String },
    addressIp: { type: String },

    bannerUrl: { type: String, default: "/images/customer/banner.png" },
    avatarUrl: { type: String, default: "/images/customer/avatar.png" },

    status: {
      type: String,
      enum: CustomerStatus,
      default: CustomerStatus.ACTIVED,
    },
  },
  { timestamps: true }
);

CustomerModel.index({ name: "text" }, { weights: { name: 1 } });

export const customersProviders = [
  {
    provide: "CUSTOMER_MODEL",
    useFactory: (connection: mongoose.Connection) =>
      connection.model("Customer", CustomerModel),
    inject: ["DATABASE_CONNECTION"],
  },
];
