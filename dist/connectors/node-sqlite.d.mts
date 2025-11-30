import type { Connector } from "dbjs";
import type { DatabaseSync } from "node:sqlite";
export interface ConnectorOptions {
	cwd?: string;
	path?: string;
	name?: string;
}
export default function nodeSqlite3Connector(opts: ConnectorOptions): Connector<DatabaseSync>;
