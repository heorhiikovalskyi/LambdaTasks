import { mysqlTable, varchar, int, date, float } from "drizzle-orm/mysql-core";
import { customers } from "./customers.js";
import { employees } from "./employees.js";
import { shippers } from "./shippers.js";
import { InferModel } from "drizzle-orm";
//import { customers } from "./customers";
//import { employees } from "./employees";
//import { shippers } from "./shippers";
export const orders = mysqlTable("orders", {
  id: int("id").primaryKey().notNull(),
  customerId: varchar("customerId", { length: 255 })
    .references(() => customers.id)
    .notNull(),
  employeeId: int("employeeId")
    .references(() => employees.id)
    .notNull(),
  orderDate: date("orderDate"),
  requiredDate: date("requiredDate"),
  shippedDate: date("shippedDate"),
  shipVia: int("shipVia")
    .references(() => shippers.id)
    .notNull(),
  freight: float("freight"),
  shipName: varchar("shipName", { length: 255 }),
  shipAddress: varchar("shipAddress", { length: 255 }),
  shipCity: varchar("shipCity", { length: 255 }),
  shipRegion: varchar("shipRegion", { length: 255 }),
  shipPostalCode: varchar("shipPostalCode", { length: 255 }),
  shipCountry: varchar("shipCountry", { length: 255 }),
});

export type NewOrder = InferModel<typeof orders, "insert">;

export type Order = InferModel<typeof orders, "select">;
