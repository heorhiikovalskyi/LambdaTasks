import { db } from "../db.js";
import { eq } from "drizzle-orm";
import {
  parseCategories,
  parseCustomers,
  parseEmployeeTerritories,
  parseEmployees,
  parseOrderDetails,
  parseOrders,
  parseProducts,
  parseRegions,
  parseShippers,
  parseSuppliers,
  parseTerritories,
} from "../../parseData/parseData.js";
import { suppliers } from "../schema/suppliers.js";
import { categories } from "../schema/categories.js";
import { customers } from "../schema/customers.js";
import { employees } from "../schema/employees.js";
import { employeeTerritories } from "../schema/employeeTerritories.js";
import { orderDetails } from "../schema/orderDetails.js";
import { orders } from "../schema/orders.js";
import { products } from "../schema/products.js";
import { regions } from "../schema/regions.js";
import { shippers } from "../schema/shippers.js";
import { territories } from "../schema/territories.js";

export const fillDb = async () => {
  try {
    const categories_ = (await parseCategories()).map((e) => ({
      id: Number(e.CategoryID),
      name: e.CategoryName,
      description: e.Description,
    }));

    const suppliers_ = (await parseSuppliers()).map((e) => ({
      id: Number(e.SupplierID),
      companyName: e.CompanyName,
      contactName: e.ContactName,
      contactTitle: e.ContactTitle,
      address: e.Address,
      city: e.City,
      region: e.Region,
      postalCode: e.PostalCode,
      phone: e.Phone,
      fax: e.Fax,
      homepage: e.HomePage,
      country: e.Country,
    }));

    const products_ = (await parseProducts()).map((e) => ({
      id: Number(e.ProductID),
      productName: e.ProductName,
      supplierId: Number(e.SupplierID),
      categoryId: Number(e.CategoryID),
      quantityPerUnit: e.QuantityPerUnit,
      unitPrice: Number(e.UnitPrice),
      unitsInStock: Number(e.UnitsInStock),
      unitsOnOrder: Number(e.UnitsOnOrder),
      reorderLevel: Number(e.ReorderLevel),
      discontinued: e.Discontinued === "1" ? true : false,
    }));

    const customers_ = (await parseCustomers()).map((e) => ({
      id: e.CustomerID,
      companyName: e.CompanyName,
      contactName: e.ContactName,
      contactTitle: e.ContactTitle,
      address: e.Address,
      city: e.City,
      region: e.Region,
      postalCode: e.PostalCode,
      phone: e.Phone,
      fax: e.Fax,
      country: e.Country,
    }));

    const regions_ = (await parseRegions()).map((e) => ({
      id: Number(e.RegionID),
      description: e.RegionDescription,
    }));

    const employees_ = (await parseEmployees()).map((e) => ({
      id: Number(e.EmployeeID),
      reportsTo: Number(e.ReportsTo),
      lastName: e.LastName,
      firstName: e.FirstName,
      title: e.Title,
      titleOfCourtesy: e.TitleOfCourtesy,
      birthDate: e.BirthDate ? new Date(e.BirthDate) : null,
      hireDate: e.HireDate ? new Date(e.HireDate) : null,
      address: e.Address,
      city: e.City,
      region: e.Region,
      postalCode: e.PostalCode,
      country: e.Country,
      homePhone: e.HomePhone,
      extension: e.Extension,
      notes: e.Notes,
    }));

    const territories_ = (await parseTerritories()).map((e) => ({
      id: e.TerritoryID,
      description: e.TerritoryDescription,
      regionId: Number(e.RegionID),
    }));

    const employeeTerritories_ = (await parseEmployeeTerritories()).map((e) => ({
      employeeId: Number(e.EmployeeID),
      territoryId: e.TerritoryID,
    }));

    const shippers_ = (await parseShippers()).map((e) => ({
      id: Number(e.ShipperID),
      companyName: e.CompanyName,
      phone: e.Phone,
    }));

    const orders_ = (await parseOrders()).map((e) => ({
      id: Number(e.OrderID),
      customerId: e.CustomerID,
      employeeId: Number(e.EmployeeID),
      orderDate: e.OrderDate ? new Date(e.OrderDate) : null,
      requiredDate: e.RequiredDate ? new Date(e.RequiredDate) : null,
      shippedDate: e.ShippedDate ? new Date(e.ShippedDate) : null,
      shipVia: Number(e.ShipVia),
      freight: Number(e.Freight),
      shipName: e.ShipName,
      shipAddress: e.ShipAddress,
      shipCity: e.ShipCity,
      shipRegion: e.ShipRegion,
      shipPostalCode: e.ShipPostalCode,
      shipCountry: e.ShipCountry,
    }));

    const orderDetails_ = (await parseOrderDetails()).map((e) => ({
      orderId: Number(e.OrderID),
      productId: Number(e.ProductID),
      unitPrice: Number(e.UnitPrice),
      quantity: Number(e.Quantity),
      discount: Number(e.Discount),
    }));

    const employeesWithoutSelfRef = employees_.map((e) => ({ ...e, reportsTo: null }));

    await db.update(employees).set({ reportsTo: null });

    await db.delete(orderDetails);
    await db.delete(orders);
    await db.delete(employeeTerritories);
    await db.delete(employees);
    await db.delete(territories);
    await db.delete(regions);
    await db.delete(customers);
    await db.delete(products);
    await db.delete(categories);
    await db.delete(shippers);
    await db.delete(suppliers);

    await db.insert(suppliers).values(suppliers_);
    await db.insert(shippers).values(shippers_);
    await db.insert(categories).values(categories_);
    await db.insert(products).values(products_);
    await db.insert(customers).values(customers_);
    await db.insert(regions).values(regions_);
    await db.insert(territories).values(territories_);
    await db.insert(employees).values(employeesWithoutSelfRef);
    await db.insert(employeeTerritories).values(employeeTerritories_);
    await db.insert(orders).values(orders_);
    await db.insert(orderDetails).values(orderDetails_);

    for (const e of employees_) {
      await db.update(employees).set({ reportsTo: e.reportsTo }).where(eq(employees.id, e.id));
    }
  } catch (err) {
    console.log(err);
  }
};

fillDb();
