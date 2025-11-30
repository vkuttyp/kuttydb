import pg from "pg";
import type { Connector } from "kuttydb";
export type ConnectorOptions = {
	url: string;
} | pg.ClientConfig;
export default function postgresqlConnector(opts: ConnectorOptions): Connector<pg.Client>;
