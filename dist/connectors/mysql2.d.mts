import mysql from "mysql2/promise";
import type { Connector } from "kuttydb";
export type ConnectorOptions = mysql.ConnectionOptions;
export default function mysqlConnector(opts: ConnectorOptions): Connector<mysql.Connection>;
