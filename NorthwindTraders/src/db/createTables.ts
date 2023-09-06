import { db } from "./db.js";
import { sql } from "drizzle-orm";
export const createDb = async () => {
  await db.execute(sql`CREATE TABLE IF NOT EXISTS "categories" (
	"id" int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" varchar(255)
);

CREATE TABLE IF NOT EXISTS "customers" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"companyName" varchar(255),
	"contactName" varchar(255),
	"address" varchar(255),
	"city" varchar(255),
	"contactTitle" varchar(255),
	"region" varchar(255),
	"postalCode" varchar(255),
	"country" varchar(255),
	"phone" varchar(255),
	"fax" varchar(255)
);

CREATE TABLE IF NOT EXISTS "employees" (
	"id" int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	"last_name" varchar(255),
	"first_name" varchar(255),
	"title" varchar(255),
	"titleOfCourtesy" varchar(255),
	"birthDate" date,
	"hireDate" date,
	"address" varchar(255),
	"country" varchar(255),
	"homePhone" varchar(255),
	"fax" varchar(255),
	"city" varchar(255),
	"region" varchar(255),
	"postalCode" varchar(255),
	"extension" varchar(255),
	"notes" varchar(1000),
	"reportsTo" int
);

CREATE TABLE IF NOT EXISTS "employeeTerritories" (
	"id" int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	"employeeId" int NOT NULL,
	"territoryId" varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "orderDetails" (
	"id" int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	"orderId" int NOT NULL,
	"unitPrice" float,
	"quantity" int,
	"discount" float,
	"productId" int NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders" (
	"id" int PRIMARY KEY NOT NULL,
	"customerId" varchar(255) NOT NULL,
	"employeeId" int NOT NULL,
	"orderDate" date,
	"requiredDate" date,
	"shippedDate" date,
	"shipVia" int NOT NULL,
	"freight" float,
	"shipName" varchar(255),
	"shipAddress" varchar(255),
	"shipCity" varchar(255),
	"shipRegion" varchar(255),
	"shipPostalCode" varchar(255),
	"shipCountry" varchar(255)
);

CREATE TABLE IF NOT EXISTS "products" (
	"id" int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	"productName" varchar(255),
	"supplierId" int NOT NULL,
	"categoryId" int NOT NULL,
	"quantityPerUnit" varchar(255),
	"unitPrice" float,
	"unitsInStock" int,
	"unitsOnOrder" int,
	"reorderLevel" int,
	"discontinued" boolean
);

CREATE TABLE IF NOT EXISTS "regions" (
	"id" int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	"description" varchar(255)
);

CREATE TABLE IF NOT EXISTS "shippers" (
	"id" int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	"companyName" varchar(255),
	"phone" varchar(255)
);

CREATE TABLE IF NOT EXISTS "suppliers" (
	"id" int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	"companyName" varchar(255),
	"contactName" varchar(255),
	"contactTitle" varchar(255),
	"address" varchar(255),
	"city" varchar(255),
	"region" varchar(255),
	"postalCode" varchar(255),
	"country" varchar(255),
	"phone" varchar(255),
	"fax" varchar(255),
	"homePage" varchar(255)
);

CREATE TABLE IF NOT EXISTS "territories" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"description" varchar(255),
	"regionId" int NOT NULL
);

ALTER TABLE "employees" ADD CONSTRAINT IF NOT EXISTS "employees_reportsTo_employees_id_fk" FOREIGN KEY ("reportsTo") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "employeeTerritories" ADD CONSTRAINT IF NOT EXISTS "employeeTerritories_employeeId_employees_id_fk" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "employeeTerritories" ADD CONSTRAINT IF NOT EXISTS "employeeTerritories_territoryId_territories_id_fk" FOREIGN KEY ("territoryId") REFERENCES "territories"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "orderDetails" ADD CONSTRAINT IF NOT EXISTS "orderDetails_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "orderDetails" ADD CONSTRAINT IF NOT EXISTS "orderDetails_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "orders" ADD CONSTRAINT IF NOT EXISTS "orders_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "orders" ADD CONSTRAINT IF NOT EXISTS "orders_employeeId_employees_id_fk" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "orders" ADD CONSTRAINT IF NOT EXISTS "orders_shipVia_shippers_id_fk" FOREIGN KEY ("shipVia") REFERENCES "shippers"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "products" ADD CONSTRAINT IF NOT EXISTS "products_supplierId_suppliers_id_fk" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "products" ADD CONSTRAINT IF NOT EXISTS "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "territories" ADD CONSTRAINT IF NOT EXISTS "territories_regionId_regions_id_fk" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "employees" MODIFY COLUMN "notes" varchar(1000);
`);
};
