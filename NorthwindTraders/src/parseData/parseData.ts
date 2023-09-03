import csv from "csvtojson";
import {
  Categories,
  Customers,
  EmployeeTerritories,
  Employees,
  OrderDetails,
  Orders,
  Products,
  Regions,
  Shippers,
  Suppliers,
  Territories,
} from "./types";

const basePath = `./src/parseData/rawData`;

export const parseCategories = () => (<unknown>csv().fromFile(`${basePath}/Categories.csv`)) as Promise<Categories>;

export const parseCustomers = () => (<unknown>csv().fromFile(`${basePath}/Customers.csv`)) as Promise<Customers>;

export const parseEmployeeTerritories = () =>
  (<unknown>csv().fromFile(`${basePath}/EmployeeTerritories.csv`)) as Promise<EmployeeTerritories>;

export const parseEmployees = () => (<unknown>csv().fromFile(`${basePath}/Employees.csv`)) as Promise<Employees>;

export const parseOrderDetails = () =>
  (<unknown>csv().fromFile(`${basePath}/OrderDetails.csv`)) as Promise<OrderDetails>;

export const parseOrders = () => (<unknown>csv().fromFile(`${basePath}/Orders.csv`)) as Promise<Orders>;

export const parseProducts = () => (<unknown>csv().fromFile(`${basePath}/Products.csv`)) as Promise<Products>;

export const parseRegions = () => (<unknown>csv().fromFile(`${basePath}/Regions.csv`)) as Promise<Regions>;

export const parseShippers = () => (<unknown>csv().fromFile(`${basePath}/Shippers.csv`)) as Promise<Shippers>;

export const parseSuppliers = () => (<unknown>csv().fromFile(`${basePath}/Suppliers.csv`)) as Promise<Suppliers>;

export const parseTerritories = () => (<unknown>csv().fromFile(`${basePath}/Territories.csv`)) as Promise<Territories>;
