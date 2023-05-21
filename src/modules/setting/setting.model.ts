import mongoose from "mongoose";
const Schema = mongoose.Schema;

export enum SettingTypes {
  string = "string",
  number = "number",
  array = "array",
  object = "object",
  richText = "richText",
  boolean = "boolean",
  json = "json",
}

export enum EditModes {
  SYSTEM = "SYSTEM",
  USER = "USER",
}

export const SettingModel = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(SettingTypes),
      required: true,
      default: SettingTypes.string,
    },
    name: { type: String, required: true },
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
    isActive: { type: Boolean, required: true, default: true },
    isPrivate: { type: Boolean, required: true, default: false },
    readOnly: { type: Boolean, default: false },
    groupId: { type: Schema.Types.ObjectId, required: true },
    editMode: {
      type: String,
      enum: Object.values(EditModes),
      required: true,
      default: EditModes.SYSTEM,
    },
  },
  { timestamps: true }
);

SettingModel.index({ name: "text" }, { weights: { name: 1 } });

export const SettingProviders = [
  {
    provide: "SETTING_MODEL",
    useFactory: (connection: mongoose.Connection) =>
      connection.model("Setting", SettingModel),
    inject: ["DATABASE_CONNECTION"],
  },
];
