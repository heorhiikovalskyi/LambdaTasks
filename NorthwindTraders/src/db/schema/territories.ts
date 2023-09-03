import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { regions } from "./regions.js";
//import { regions } from "./regions";
export const territories = mysqlTable("territories", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  description: varchar("description", { length: 255 }),
  regionId: int("regionId")
    .references(() => regions.id)
    .notNull(),
});
