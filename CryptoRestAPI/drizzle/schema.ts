import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  uniqueIndex,
  int,
  varchar,
  index,
  foreignKey,
  float,
  datetime,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const cryptocurrency = mysqlTable(
  "cryptocurrency",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    symbol: varchar("symbol", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      symbol: uniqueIndex("symbol").on(table.symbol),
    };
  }
);

export const exchangerate = mysqlTable(
  "exchangerate",
  {
    id: int("id").autoincrement().primaryKey().notNull(),
    market: int("market").references(() => market.id, { onDelete: "set null" }),
    cryptocurrency: int("cryptocurrency").references(() => cryptocurrency.id, { onDelete: "set null" }),
    conversiontoUsd: float("conversiontoUSD").notNull(),
    date: datetime("date", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      market: index("market").on(table.market),
      cryptocurrency: index("cryptocurrency").on(table.cryptocurrency),
    };
  }
);

export const market = mysqlTable("market", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});
