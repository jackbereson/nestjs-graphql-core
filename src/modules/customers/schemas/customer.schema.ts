import mongoose from 'mongoose';
import { Customer } from '../entities/customer.entity';
import { BaseDocument, ModelHook } from 'src/base/model.base';
const Schema = mongoose.Schema;

export enum CustomerStatus {
    ACTIVE = "ACTIVE",
    DEACTIVED = "DEACTIVED",
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

export const CustomerSchema = new Schema(
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
        role: { type: String },
        nonce: { type: String },
        addressIp: { type: String },

        bannerUrl: { type: String, default: "/images/customer/banner.png" },
        avatarUrl: { type: String, default: "/images/customer/avatar.png" },

        instagram: { type: String },
        website: { type: String },

        referralCustomerId: { type: Schema.Types.ObjectId, ref: "Customer" },
        status: { type: String, enum: CustomerStatus, default: CustomerStatus.ACTIVE },
    },
    { timestamps: true }
);

CustomerSchema.index(
    { address: "text", addressIp: "text" },
    { weights: { address: 2, addressIp: 3 } }
);

export const customersProviders = [
    {
        provide: 'CUSTOMER_MODEL',
        useFactory: (connection: mongoose.Connection) => connection.model('Customer', CustomerSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];