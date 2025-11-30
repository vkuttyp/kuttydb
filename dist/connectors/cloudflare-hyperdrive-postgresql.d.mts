import pg from "pg";
import type { Connector } from "kuttydb";
type OmitPgConfig = Omit<pg.ClientConfig, "user" | "database" | "password" | "port" | "host" | "connectionString">;
export type ConnectorOptions = {
	bindingName: string;
} & OmitPgConfig;
export default function cloudflareHyperdrivePostgresqlConnector(opts: ConnectorOptions): Connector<pg.Client>;
