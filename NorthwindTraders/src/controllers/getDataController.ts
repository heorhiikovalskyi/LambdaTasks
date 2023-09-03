import { Request, Response } from "express";
import { CustomersRepo } from "../repositories/customersRepo.js";
import { EmployeesRepo } from "../repositories/employeesRepo.js";
import { OrdersRepo } from "../repositories/ordersRepo.js";
import { ProductsRepo } from "../repositories/productsRepo.js";
import { SuppliersRepo } from "../repositories/suppliersRepo.js";

const customersRepo = CustomersRepo.getInstance();
const employeesRepo = EmployeesRepo.getInstance();
const ordersRepo = OrdersRepo.getInstance();
const productsRepo = ProductsRepo.getInstance();
const suppliersRepo = SuppliersRepo.getInstance();

export class GetDataController {
  private constructor() {}
  private static instance: GetDataController;
  public static getInstance(): GetDataController {
    if (!GetDataController.instance) {
      GetDataController.instance = new GetDataController();
    }
    return GetDataController.instance;
  }

  customers = async (req: Request, res: Response, next: any) => {
    const { getCustomers, getCustomer, getCustomersByName } = customersRepo;
    try {
      const { offset, count } = req.query;
      if (offset && count) {
        const customers = await getCustomers(+offset, +count);
        return res.status(200).json(customers);
      }

      const { id } = req.query;

      if (id) {
        const customer = await getCustomer(id as string);
        return res.status(200).json(customer);
      }

      const { name } = req.query;

      if (name) {
        const customers = await getCustomersByName(name as string);
        return res.status(200).json(customers);
      }
      return res.sendStatus(400);
    } catch (err) {
      next(err);
    }
  };

  employees = async (req: Request, res: Response, next: any) => {
    const { getEmployees, getEmployee } = employeesRepo;
    try {
      const { startId, count } = req.query;
      if (startId && count) {
        const employees = await getEmployees(+startId, +count);
        return res.status(200).json(employees);
      }

      const { id } = req.query;
      if (id) {
        const employee = await getEmployee(+id);
        return res.status(200).json(employee);
      }
      return res.sendStatus(400);
    } catch (err) {
      next(err);
    }
  };

  orders = async (req: Request, res: Response, next: any) => {
    const { getOrders } = ordersRepo;
    try {
      const { startId, count } = req.query;
      if (startId && count) {
        const orders = await getOrders(+startId, +count);
        return res.status(200).json(orders);
      }
      return res.sendStatus(400);
    } catch (err) {
      next(err);
    }
  };

  products = async (req: Request, res: Response, next: any) => {
    const { getProducts, getProductsByName } = productsRepo;
    try {
      const { startId, count } = req.query;

      if (startId && count) {
        const products = await getProducts(+startId, +count);
        return res.status(200).json(products);
      }

      const { name } = req.query;

      if (name) {
        const products = await getProductsByName(name as string);
        return res.status(200).json(products);
      }
      return res.sendStatus(400);
    } catch (err) {
      next(err);
    }
  };

  suppliers = async (req: Request, res: Response, next: any) => {
    const { getSuppliers, getSupplier } = suppliersRepo;
    try {
      const { startId, count } = req.query;

      if (startId && count) {
        const suppliers = await getSuppliers(+startId, +count);
        return res.status(200).json(suppliers);
      }

      const { id } = req.query;

      if (id) {
        const supplier = await getSupplier(+id);
        return res.status(200).json(supplier);
      }
      return res.sendStatus(400);
    } catch (err) {
      next(err);
    }
  };
}
