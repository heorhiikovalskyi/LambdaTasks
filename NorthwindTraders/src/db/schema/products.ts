import { mysqlTable, int, varchar, boolean, float } from "drizzle-orm/mysql-core";
import { InferModel } from "drizzle-orm";
import { suppliers } from "./suppliers.js";
import { categories } from "./categories.js";
//import { suppliers } from "./suppliers";
//import { categories } from "./categories";

export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey().notNull(),
  productName: varchar("productName", { length: 255 }),
  supplierId: int("supplierId")
    .references(() => suppliers.id)
    .notNull(),
  categoryId: int("categoryId")
    .references(() => categories.id)
    .notNull(),
  quantityPerUnit: varchar("quantityPerUnit", { length: 255 }),
  unitPrice: float("unitPrice"),
  unitsInStock: int("unitsInStock"),
  unitsOnOrder: int("unitsOnOrder"),
  reorderLevel: int("reorderLevel"),
  discontinued: boolean("discontinued"),
});

export type NewProduct = InferModel<typeof products, "insert">;

export type Product = InferModel<typeof products, "select">;
