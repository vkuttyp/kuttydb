import { Client, type Config } from "@planetscale/database";
import type { Connector } from "kuttydb";
export type ConnectorOptions = Config;
export default function planetscaleConnector(opts: ConnectorOptions): Connector<Client>;
