import { describe } from "vitest";
import connector from "../../src/connectors/postgresql.js";
import { testConnector } from "./_tests.js";

describe.runIf(process.env.POSTGRESQL_URL)(
  "connectors: postgresql.test",
  () => {
    testConnector({
      dialect: "postgresql",
      connector: connector({
        url: process.env.POSTGRESQL_URL!,
      }),
    });
  },
);
