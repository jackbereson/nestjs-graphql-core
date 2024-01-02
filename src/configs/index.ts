import development from "./development";
import production from "./production";
import testing from "./testing";

function getConfig(environment: string) {
  if (environment === "development") {
    return development;
  } else if (environment === "production") {
    return production;
  } else if (environment === "testing") {
    return testing;
  } else {
    return development;
  }
}

const configs = getConfig(process.env.NODE_ENV);

export { configs };
