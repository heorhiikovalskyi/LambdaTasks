import { Customer } from "../db/schema/customers.js";
import { Employee } from "../db/schema/employees.js";
import { Order } from "../db/schema/orders.js";
import { Product } from "../db/schema/products.js";
import { Supplier } from "../db/schema/suppliers.js";

type Query = {
  sql: string;
  params: unknown[];
};

export type CustomersRes = {
  customers: Customer[];
  query: Query;
};
export type CustomerRes = {
  customer: Customer;
  query: Query;
};

export type EmployeesRes = { employees: Employee[]; query: Query };
export type EmployeeRes = { employee: Employee; query: Query };

export type OrdersRes = { orders: Order[]; query: Query };

export type ProductsRes = { products: Product[]; query: Query };

export type SuppliersRes = { suppliers: Supplier[]; query: Query };
export type SupplierRes = { supplier: Supplier; query: Query };
