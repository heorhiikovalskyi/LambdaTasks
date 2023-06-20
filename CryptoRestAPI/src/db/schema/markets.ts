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
export const markets = mysqlTable("market", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),
});
