import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey().notNull(),
  name: varchar("name", { length: 255 }),
  description: varchar("description", { length: 255 }),
});
