import base from "./base";

export default {
  ...base,
  env: "development",
  maindb: process.env["MONGODB_URI"],
  debug: true,
};
