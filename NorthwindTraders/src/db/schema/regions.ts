import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const regions = mysqlTable("regions", {
  id: int("id").autoincrement().primaryKey().notNull(),
  description: varchar("description", { length: 255 }),
});
