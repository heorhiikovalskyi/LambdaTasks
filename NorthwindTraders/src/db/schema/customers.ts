import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";

export const customers = mysqlTable("customers", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  companyName: varchar("companyName", { length: 255 }),
  contactName: varchar("contactName", { length: 255 }),
  address: varchar("address", { length: 255 }),
  city: varchar("city", { length: 255 }),
  contactTitle: varchar("contactTitle", { length: 255 }),
  region: varchar("region", { length: 255 }),
  postalCode: varchar("postalCode", { length: 255 }),
  country: varchar("country", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  fax: varchar("fax", { length: 255 }),
});

export type NewCustomer = InferModel<typeof customers, "insert">;

export type Customer = InferModel<typeof customers, "select">;
