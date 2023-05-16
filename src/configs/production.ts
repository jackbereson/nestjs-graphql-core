import base from "./base";

export default {
  ...base,
  env: "production",
  maindb: process.env["MONGODB_URI"],
  debug: false,
};
