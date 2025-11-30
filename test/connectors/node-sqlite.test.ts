import { describe } from "vitest";
import connector from "../../src/connectors/node-sqlite.js";
import { testConnector } from "./_tests.js";

describe("connectors: node-sqlite (native)", () => {
  testConnector({
    dialect: "sqlite",
    connector: connector({
      name: ":memory:",
    }),
  });
});
