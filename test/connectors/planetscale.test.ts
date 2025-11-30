import { describe } from "vitest";
import connector from "../../src/connectors/planetscale.js";
import { testConnector } from "./_tests.js";

describe.runIf(
  process.env.PLANETSCALE_HOST &&
    process.env.PLANETSCALE_USERNAME &&
    process.env.PLANETSCALE_PASSWORD,
)("connectors: planetscale.test", () => {
  testConnector({
    dialect: "mysql",
    connector: connector({
      host: process.env.PLANETSCALE_HOST!,
      username: process.env.PLANETSCALE_USERNAME!,
      password: process.env.PLANETSCALE_PASSWORD!,
    }),
  });
});
