import base from "./base";

export default {
  ...base,
  env: "testing",
  maindb: process.env["MONGODB_URI"],
  debug: false,
};
