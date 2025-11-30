import { describe } from "vitest";
import connector from "../../src/connectors/sqlite3.js";
import { testConnector } from "./_tests.js";

describe("connectors: sqlite3", () => {
  testConnector({
    dialect: "sqlite",
    connector: connector({
      name: ":memory:",
    }),
  });
});
