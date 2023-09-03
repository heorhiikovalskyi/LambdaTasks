import { mysqlTable, varchar, int, date, AnyMySqlColumn } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const employees = mysqlTable("employees", {
  id: int("id").autoincrement().primaryKey().notNull(),
  lastName: varchar("last_name", { length: 255 }),
  firstName: varchar("first_name", { length: 255 }),
  title: varchar("title", { length: 255 }),
  titleOfCourtesy: varchar("titleOfCourtesy", { length: 255 }),
  birthDate: date("birthDate"),
  hireDate: date("hireDate"),
  address: varchar("address", { length: 255 }),
  country: varchar("country", { length: 255 }),
  homePhone: varchar("homePhone", { length: 255 }),
  fax: varchar("fax", { length: 255 }),
  city: varchar("city", { length: 255 }),
  region: varchar("region", { length: 255 }),
  postalCode: varchar("postalCode", { length: 255 }),
  extension: varchar("extension", { length: 255 }),
  notes: varchar("notes", { length: 1000 }),
  reportsTo: int("reportsTo").references((): AnyMySqlColumn => employees.id),
});

export type NewEmployee = InferModel<typeof employees, "insert">;

export type Employee = InferModel<typeof employees, "select">;
