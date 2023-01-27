import assert from "assert";
import { config } from "dotenv";

config();

const env = {
  node_env: process.env.NODE_ENV as string,
  send_grid_api_key: process.env.SEND_GRID_API_KEY as string,
  database_url: process.env.DATABASE_URL as string,
};

assertNonEmptyString(env.node_env);
assertNonEmptyString(env.send_grid_api_key);
assertNonEmptyString(env.database_url);

function assertNonEmptyString(str: unknown) {
  assert(typeof str === "string");
  assert(str !== "");
}

export { env };
