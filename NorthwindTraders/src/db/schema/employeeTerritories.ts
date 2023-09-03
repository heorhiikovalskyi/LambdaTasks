import { mysqlTable, varchar, int, date } from "drizzle-orm/mysql-core";
import { employees } from "./employees.js";
import { territories } from "./territories.js";
//import { employees } from "./employees";
//import { territories } from "./territories";

export const employeeTerritories = mysqlTable("employeeTerritories", {
  id: int("id").autoincrement().primaryKey().notNull(),
  employeeId: int("employeeId")
    .references(() => employees.id)
    .notNull(),
  territoryId: varchar("territoryId", { length: 255 })
    .references(() => territories.id)
    .notNull(),
});
