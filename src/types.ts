export type Primitive = string | number | boolean | undefined | null;

export type SQLDialect = "mysql" | "postgresql" | "sqlite" | "libsql" | "mssql";

export type Statement = {
  bind(...params: Primitive[]): PreparedStatement;
  all(...params: Primitive[]): Promise<unknown[]>;
  run(...params: Primitive[]): Promise<{ success: boolean }>;
  get(...params: Primitive[]): Promise<unknown>;
};

export type PreparedStatement = {
  bind(...params: Primitive[]): PreparedStatement;
  all(): Promise<unknown[]>;
  run(): Promise<{ success: boolean }>;
  get(): Promise<unknown>;
};

export type ExecResult = unknown;

export type Connector<TInstance = unknown> = {
  name: string;
  dialect: SQLDialect;
  getInstance: () => TInstance | Promise<TInstance>;
  exec: (sql: string) => ExecResult | Promise<ExecResult>;
  prepare: (sql: string) => Statement;
  dispose?: () => void | Promise<void>;
};

type DefaultSQLResult = {
  lastInsertRowid?: number;
  changes?: number;
  error?: string;
  rows?: { id?: string | number; [key: string]: unknown }[];
  success?: boolean;
};

export interface Database<TConnector extends Connector = Connector>
  extends AsyncDisposable {
  readonly dialect: SQLDialect;
  readonly disposed: boolean;
  getInstance: () => Promise<Awaited<ReturnType<TConnector["getInstance"]>>>;
  exec: (sql: string) => Promise<ExecResult>;
  prepare: (sql: string) => Statement;
  sql: <T = DefaultSQLResult>(
    strings: TemplateStringsArray,
    ...values: Primitive[]
  ) => Promise<T>;
  dispose: () => Promise<void>;
  [Symbol.asyncDispose]: () => Promise<void>;
}
