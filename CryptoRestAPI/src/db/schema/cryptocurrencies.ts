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
export const cryptocurrencies = mysqlTable(
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
