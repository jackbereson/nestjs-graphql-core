import { UtilsHelper } from "../helpers/utils.helper";
import { compact, get } from "lodash";
const pjson = require("../../package.json");


export default {
  name: pjson.name,
  version: pjson.version,
  description: pjson.description,
  port: process.env.PORT || 3000,
  basicAuth: {
    users: { mcom: "mcom@123" },
  },
  winston: {
    db: process.env.MONGO_LOG || "",
    level: process.env.LOG_LEVEL || `silly`,
  },
  query: {
    limit: 10,
  },
  secretKey: process.env.SECRET || "HkQlTCrDfYWezqEp494TjDUqBhSzQSnn",
  timezone: "Asia/Ho_Chi_Minh",
  domain: "http://localhost:" + process.env.PORT || 3000,
  firebase: JSON.parse(process.env.FIREBASE || null),
  firebaseView: process.env.FIREBASE_VIEW || null,
  redis: {
    enable: false,
    host: process.env.REDIS_HOST || "redis",
    port: Number(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASS,
  },
  chatbot: {
    host: process.env.CHATBOT_HOST || "https://bot-server.mcom.app",
  },
  domainName: process.env.DOMAIN_NAME || "http://localhost:5555",
  
  scheduler: {
    includes: compact(get(process.env, "SCHEDULER_INCLUDES", "").split(",")),
    excludes: compact(get(process.env, "SCHEDULER_EXCLUDES", "").split(",")),
  },
};
