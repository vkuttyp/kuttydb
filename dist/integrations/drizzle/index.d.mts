import type { Database } from "kuttydb";
import { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core";
import { type DrizzleConfig as DrizzleBaseConfig } from "drizzle-orm";
export type DrizzleDatabase<TSchema extends Record<string, unknown> = Record<string, never>> = BaseSQLiteDatabase<"async", any, TSchema>;
export type DrizzleConfig<TSchema extends Record<string, unknown> = Record<string, never>> = DrizzleBaseConfig<TSchema>;
export declare function drizzle<TSchema extends Record<string, unknown> = Record<string, never>>(db: Database, config?: DrizzleConfig<TSchema>): DrizzleDatabase<TSchema>;
