import mongoose from "mongoose";
const Schema = mongoose.Schema;


export const SettingGroupModel = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    desc: { type: String },
    icon: { type: String },
    readOnly: { type: Boolean, default: false },
  },
  { timestamps: true, collation: { locale: "vi" } }
);

SettingGroupModel.index({ slug: 1 });
SettingGroupModel.index({ name: "text", slug: "text" }, { weights: { name: 2, slug: 4 } });

export const SettingGroupProviders = [
  {
    provide: "SETTINGGROUP_MODEL",
    useFactory: (connection: mongoose.Connection) =>
      connection.model("SettingGroup", SettingGroupModel),
    inject: ["DATABASE_CONNECTION"],
  },
];
