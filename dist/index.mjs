//#region src/template.ts
function sqlTemplate(strings, ...values) {
	if (!isTemplateStringsArray(strings) || !Array.isArray(values)) throw new Error("[dbjs] invalid template invocation");
	const staticIndexes = [];
	let result = strings[0] || "";
	for (let i = 1; i < strings.length; i++) {
		if (result.endsWith("{") && strings[i]?.startsWith("}")) {
			result = result.slice(0, -1) + values[i - 1] + strings[i].slice(1);
			staticIndexes.push(i - 1);
			continue;
		}
		result += `?${strings[i] ?? ""}`;
	}
	const dynamicValues = values.filter((_, i) => !staticIndexes.includes(i));
	return [result.trim(), dynamicValues];
}
function isTemplateStringsArray(strings) {
	return Array.isArray(strings) && "raw" in strings && Array.isArray(strings.raw);
}

//#endregion
//#region src/database.ts
const SQL_SELECT_RE = /^select/i;
const SQL_RETURNING_RE = /[\s]returning[\s]/i;
const DIALECTS_WITH_RET = new Set(["postgresql", "sqlite"]);
const DISPOSED_ERR = "This database instance has been disposed and cannot be used.";
/**
* Creates and returns a database interface using the specified connector.
* This interface allows you to execute raw SQL queries, prepare SQL statements,
* and execute SQL queries with parameters using tagged template literals.
*
* @param {Connector} connector - The database connector used to execute and prepare SQL statements. See {@link Connector}.
* @returns {Database} The database interface that allows SQL operations. See {@link Database}.
*/
function createDatabase(connector) {
	let _disposed = false;
	const checkDisposed = () => {
		if (_disposed) {
			const err = new Error(DISPOSED_ERR);
			if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(err, checkDisposed);
			throw err;
		}
	};
	return {
		get dialect() {
			return connector.dialect;
		},
		get disposed() {
			return _disposed;
		},
		getInstance() {
			checkDisposed();
			return connector.getInstance();
		},
		exec: (sql) => {
			checkDisposed();
			return Promise.resolve(connector.exec(sql));
		},
		prepare: (sql) => {
			checkDisposed();
			return connector.prepare(sql);
		},
		sql: async (strings, ...values) => {
			checkDisposed();
			const [sql, params] = sqlTemplate(strings, ...values);
			if (SQL_SELECT_RE.test(sql) || DIALECTS_WITH_RET.has(connector.dialect) && SQL_RETURNING_RE.test(sql)) return {
				rows: await connector.prepare(sql).all(...params),
				success: true
			};
			else return await connector.prepare(sql).run(...params);
		},
		dispose: () => {
			if (_disposed) return Promise.resolve();
			_disposed = true;
			try {
				return Promise.resolve(connector.dispose?.());
			} catch (error) {
				return Promise.reject(error);
			}
		},
		[Symbol.asyncDispose]() {
			return this.dispose();
		}
	};
}

//#endregion
//#region src/_connectors.ts
const connectors = Object.freeze({
	"better-sqlite3": "dbjs/connectors/better-sqlite3",
	"bun-sqlite": "dbjs/connectors/bun-sqlite",
	"bun": "dbjs/connectors/bun-sqlite",
	"cloudflare-d1": "dbjs/connectors/cloudflare-d1",
	"cloudflare-hyperdrive-mysql": "dbjs/connectors/cloudflare-hyperdrive-mysql",
	"cloudflare-hyperdrive-postgresql": "dbjs/connectors/cloudflare-hyperdrive-postgresql",
	"libsql-core": "dbjs/connectors/libsql/core",
	"libsql-http": "dbjs/connectors/libsql/http",
	"libsql-node": "dbjs/connectors/libsql/node",
	"libsql": "dbjs/connectors/libsql/node",
	"libsql-web": "dbjs/connectors/libsql/web",
	"mssql": "dbjs/connectors/mssql",
	"mysql2": "dbjs/connectors/mysql2",
	"node-sqlite": "dbjs/connectors/node-sqlite",
	"sqlite": "dbjs/connectors/node-sqlite",
	"pglite": "dbjs/connectors/pglite",
	"planetscale": "dbjs/connectors/planetscale",
	"postgresql": "dbjs/connectors/postgresql",
	"sqlite3": "dbjs/connectors/sqlite3"
});

//#endregion
export { connectors, createDatabase };
//# sourceMappingURL=index.mjs.map