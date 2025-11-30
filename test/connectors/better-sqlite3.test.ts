import { describe } from "vitest";
import connector from "../../src/connectors/better-sqlite3.js";
import { testConnector } from "./_tests.js";

describe("connectors: better-sqlite3", () => {
  testConnector({
    dialect: "sqlite",
    connector: connector({
      name: ":memory:",
    }),
  });
});
