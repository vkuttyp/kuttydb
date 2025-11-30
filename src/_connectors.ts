// Auto-generated using scripts/gen-connectors.
// Do not manually edit!
import type { ConnectorOptions as BetterSQLite3Options } from "dbjs/connectors/better-sqlite3";
import type { ConnectorOptions as BunSQLiteOptions } from "dbjs/connectors/bun-sqlite";
import type { ConnectorOptions as CloudflareD1Options } from "dbjs/connectors/cloudflare-d1";
import type { ConnectorOptions as CloudflareHyperdriveMySQLOptions } from "dbjs/connectors/cloudflare-hyperdrive-mysql";
import type { ConnectorOptions as CloudflareHyperdrivePostgreSQLOptions } from "dbjs/connectors/cloudflare-hyperdrive-postgresql";
import type { ConnectorOptions as LibSQLCoreOptions } from "dbjs/connectors/libsql/core";
import type { ConnectorOptions as LibSQLHttpOptions } from "dbjs/connectors/libsql/http";
import type { ConnectorOptions as LibSQLNodeOptions } from "dbjs/connectors/libsql/node";
import type { ConnectorOptions as LibSQLWebOptions } from "dbjs/connectors/libsql/web";
import type { ConnectorOptions as MSSQLOptions } from "dbjs/connectors/mssql";
import type { ConnectorOptions as MySQL2Options } from "dbjs/connectors/mysql2";
import type { ConnectorOptions as NodeSQLiteOptions } from "dbjs/connectors/node-sqlite";
import type { ConnectorOptions as PgliteOptions } from "dbjs/connectors/pglite";
import type { ConnectorOptions as PlanetscaleOptions } from "dbjs/connectors/planetscale";
import type { ConnectorOptions as PostgreSQLOptions } from "dbjs/connectors/postgresql";
import type { ConnectorOptions as SQLite3Options } from "dbjs/connectors/sqlite3";

export type ConnectorName = "better-sqlite3" | "bun-sqlite" | "bun" | "cloudflare-d1" | "cloudflare-hyperdrive-mysql" | "cloudflare-hyperdrive-postgresql" | "libsql-core" | "libsql-http" | "libsql-node" | "libsql" | "libsql-web" | "mssql" | "mysql2" | "node-sqlite" | "sqlite" | "pglite" | "planetscale" | "postgresql" | "sqlite3";

export type ConnectorOptions = {
  "better-sqlite3": BetterSQLite3Options;
  "bun-sqlite": BunSQLiteOptions;
  /** alias of bun-sqlite */
  "bun": BunSQLiteOptions;
  "cloudflare-d1": CloudflareD1Options;
  "cloudflare-hyperdrive-mysql": CloudflareHyperdriveMySQLOptions;
  "cloudflare-hyperdrive-postgresql": CloudflareHyperdrivePostgreSQLOptions;
  "libsql-core": LibSQLCoreOptions;
  "libsql-http": LibSQLHttpOptions;
  "libsql-node": LibSQLNodeOptions;
  /** alias of libsql-node */
  "libsql": LibSQLNodeOptions;
  "libsql-web": LibSQLWebOptions;
  "mssql": MSSQLOptions;
  "mysql2": MySQL2Options;
  "node-sqlite": NodeSQLiteOptions;
  /** alias of node-sqlite */
  "sqlite": NodeSQLiteOptions;
  "pglite": PgliteOptions;
  "planetscale": PlanetscaleOptions;
  "postgresql": PostgreSQLOptions;
  "sqlite3": SQLite3Options;
};

export const connectors: Record<ConnectorName, string> = Object.freeze({
  "better-sqlite3": "dbjs/connectors/better-sqlite3",
  "bun-sqlite": "dbjs/connectors/bun-sqlite",
  /** alias of bun-sqlite */
  "bun": "dbjs/connectors/bun-sqlite",
  "cloudflare-d1": "dbjs/connectors/cloudflare-d1",
  "cloudflare-hyperdrive-mysql": "dbjs/connectors/cloudflare-hyperdrive-mysql",
  "cloudflare-hyperdrive-postgresql": "dbjs/connectors/cloudflare-hyperdrive-postgresql",
  "libsql-core": "dbjs/connectors/libsql/core",
  "libsql-http": "dbjs/connectors/libsql/http",
  "libsql-node": "dbjs/connectors/libsql/node",
  /** alias of libsql-node */
  "libsql": "dbjs/connectors/libsql/node",
  "libsql-web": "dbjs/connectors/libsql/web",
  "mssql": "dbjs/connectors/mssql",
  "mysql2": "dbjs/connectors/mysql2",
  "node-sqlite": "dbjs/connectors/node-sqlite",
  /** alias of node-sqlite */
  "sqlite": "dbjs/connectors/node-sqlite",
  "pglite": "dbjs/connectors/pglite",
  "planetscale": "dbjs/connectors/planetscale",
  "postgresql": "dbjs/connectors/postgresql",
  "sqlite3": "dbjs/connectors/sqlite3",
} as const);
