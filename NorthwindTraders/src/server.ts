import express from "express";
import "dotenv/config.js";
import { GetDataController } from "./controllers/getDataController.js";
import {
  validateCustomers,
  validateEmployees,
  validateOrders,
  validateProducts,
  validateSuppliers,
} from "./validation.js";
import { errorHandler } from "./errorHandler.js";
import { fillDb } from "./db/createDb/fillDb.js";
import { createDb } from "./db/createTables.js";

await createDb();
await fillDb();

const getDataController = GetDataController.getInstance();
const { customers, orders, employees, products, suppliers } = getDataController;

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.get("/customers", validateCustomers, customers);
app.get("/orders", validateOrders, orders);
app.get("/employees", validateEmployees, employees);
app.get("/products", validateProducts, products);
app.get("/suppliers", validateSuppliers, suppliers);

app.use(errorHandler);

app.listen(PORT);
