import { Connection, Request, TYPES } from "tedious";
export default function mssqlConnector(opts) {
	let _client;
	async function getClient() {
		if (_client && _client.state === _client.STATE.LOGGED_IN) {
			return _client;
		}
		return new Promise((resolve, reject) => {
			const client = new Connection(opts);
			client.connect((error) => {
				if (error) {
					reject(error);
				}
				_client = client;
			});
			client.on("connect", () => {
				if (_client) {
					resolve(_client);
				}
			});
			client.on("error", reject);
		});
	}
	async function _run(sql, parameters) {
		if (!sql) {
			throw new Error("SQL query must be provided");
		}
		const connection = await getClient();
		const { sql: _sql, parameters: _parameters } = prepareSqlParameters(sql, parameters);
		const query = new Promise((resolve, reject) => {
			let success = false;
			const request = new Request(_sql, (error) => {
				if (error) {
					reject(error);
				} else {
					success = true;
				}
			});
			const parameterKeys = Object.keys(_parameters);
			for (const key of parameterKeys) {
				const parameter = _parameters[key];
				if (!parameter) continue;
				request.addParameter(parameter.name, parameter.type, parameter.value);
			}
			const rows = [];
			request.on("row", (columns = []) => {
				const currentRow = {};
				for (const column of columns) {
					const { value, metadata } = column;
					const { colName } = metadata;
					currentRow[colName] = value;
				}
				rows.push(currentRow);
			});
			request.on("requestCompleted", () => {
				connection.close();
				resolve({
					rows,
					success
				});
			});
			request.on("error", (error) => {
				connection.close();
				reject(error);
			});
			connection.execSql(request);
		});
		try {
			const { rows, success } = await query;
			return {
				rows,
				success
			};
		} catch (error) {
			error.sql = _sql;
			error.parameters = parameters;
			throw error;
		}
	}
	return {
		name: "mssql",
		dialect: "mssql",
		getInstance: () => getClient(),
		exec(sql) {
			return _run(sql, []);
		},
		prepare(sql) {
			const _sql = sql;
			let _params = [];
			const statement = {
				bind(...params) {
					if (params.length > 0) {
						_params = params;
					}
					return statement;
				},
				async all(...params) {
					const { rows } = await _run(_sql, params.length > 0 ? params : _params);
					return rows;
				},
				async run(...params) {
					const { success = false } = await _run(_sql, params.length > 0 ? params : _params) || {};
					return { success };
				},
				async get(...params) {
					const { rows: [row] } = await _run(_sql, params.length > 0 ? params : _params);
					return row;
				}
			};
			return statement;
		}
	};
}
// taken from the `kysely` library: https://github.com/kysely-org/kysely/blob/413a88516c20be42dc8cbebade68c27669a3ac1a/src/dialect/mssql/mssql-driver.ts#L440
export function getTediousDataType(value) {
	if (value === null || value === undefined || typeof value === "string") {
		return TYPES.NVarChar;
	}
	if (typeof value === "bigint" || typeof value === "number" && value % 1 === 0) {
		return value < -2147483648 || value > 2147483647 ? TYPES.BigInt : TYPES.Int;
	}
	if (typeof value === "number") {
		return TYPES.Float;
	}
	if (typeof value === "boolean") {
		return TYPES.Bit;
	}
	if (value instanceof Date) {
		return TYPES.DateTime2;
	}
	if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
		return TYPES.VarBinary;
	}
	return TYPES.NVarChar;
}
// replace `?` placeholders with `@1`, `@2`, etc.
export function prepareSqlParameters(sql, parameters = []) {
	const parameterIndexes = [];
	const tokens = [...sql];
	// find all `?` placeholders in the SQL string
	for (const [i, token] of tokens.entries()) {
		if (token === "?") {
			parameterIndexes.push(i);
		}
	}
	const namedParameters = {};
	for (const [index, parameterIndex] of parameterIndexes.entries()) {
		const incrementedIndex = index + 1;
		// replace `?` placeholder with index-based parameter name
		tokens[parameterIndex] = `@${incrementedIndex}`;
		// store the parameter value and type with the index-based parameter name
		namedParameters[`@${incrementedIndex}`] = {
			name: String(incrementedIndex),
			type: getTediousDataType(parameters[index]),
			value: parameters[index]
		};
	}
	return {
		sql: tokens.join(""),
		parameters: namedParameters
	};
}
