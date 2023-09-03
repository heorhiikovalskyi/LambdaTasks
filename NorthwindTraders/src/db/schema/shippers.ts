import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const shippers = mysqlTable("shippers", {
  id: int("id").autoincrement().primaryKey().notNull(),
  companyName: varchar("companyName", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
});
