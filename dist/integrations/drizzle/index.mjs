import { dbjsSession } from "./_session.mjs";
import { DefaultLogger } from "drizzle-orm/logger";
import { BaseSQLiteDatabase, SQLiteAsyncDialect } from "drizzle-orm/sqlite-core";
import { createTableRelationsHelpers, extractTablesRelationalConfig } from "drizzle-orm";
export function drizzle(db, config) {
	const dialect = new SQLiteAsyncDialect({ casing: config?.casing });
	let logger;
	if (config?.logger === true) {
		logger = new DefaultLogger();
	} else if (config?.logger !== false && config?.logger !== undefined) {
		logger = config.logger;
	}
	// Transform user schema to RelationalSchemaConfig
	// Reference: https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/d1/driver.ts
	let schema;
	if (config?.schema) {
		const tablesConfig = extractTablesRelationalConfig(config.schema, createTableRelationsHelpers);
		schema = {
			fullSchema: config.schema,
			schema: tablesConfig.tables,
			tableNamesMap: tablesConfig.tableNamesMap
		};
	}
	const session = new dbjsSession(db, dialect, schema, { logger });
	return new BaseSQLiteDatabase(
		"async",
		dialect,
		// @ts-expect-error TODO
		session,
		schema
	);
}
