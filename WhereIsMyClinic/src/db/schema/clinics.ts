import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const Clinics = mysqlTable("clinics", {
  id: int("id").autoincrement().primaryKey().notNull(),
  slug: varchar("slug", { length: 255 }),
  name: varchar("name", { length: 255 }),
  longName: varchar("longName", { length: 255 }),
  suburbSlug: varchar("suburbSlug", { length: 255 }),
  city: varchar("city", { length: 255 }),
  suburbName: varchar("suburbName", { length: 255 }),
  fullAddress: varchar("fullAddress", { length: 255 }),
  pms: varchar("pms", { length: 255 }),
  metaTitle: varchar("metaTitle", { length: 255 }),
  metaDesc: varchar("metaDesc", { length: 255 }),
  typeform: varchar("typeform", { length: 255 }),
  website: varchar("website", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  about: varchar("about", { length: 255 }),
  postCode: varchar("postCode", { length: 20 }),
  state: varchar("state", { length: 20 }),
});

export type NewClinic = InferInsertModel<typeof Clinics>;

export type Clinic = InferSelectModel<typeof Clinics>;
