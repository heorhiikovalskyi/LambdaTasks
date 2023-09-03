import { gte, eq, like, sql } from "drizzle-orm";
import { customers } from "../db/schema/customers.js";
import { db } from "../db/db.js";
import { Customer } from "../db/schema/customers.js";
import { CustomerRes, CustomersRes } from "../controllers/types.js";

export class CustomersRepo {
  private constructor() {}
  private static instance: CustomersRepo;
  public static getInstance(): CustomersRepo {
    if (!CustomersRepo.instance) {
      CustomersRepo.instance = new CustomersRepo();
    }
    return CustomersRepo.instance;
  }

  getCustomers = async (offset: number, count: number): Promise<CustomersRes> => {
    const query = db.select().from(customers).limit(count).offset(offset);
    const customers_ = await query;
    return { customers: customers_, query: query.toSQL() };
  };

  getCustomer = async (id: string): Promise<CustomerRes> => {
    const query = db.select().from(customers).where(eq(customers.id, id));
    const customer = (await query)[0];
    return { customer, query: query.toSQL() };
  };

  getCustomersByName = async (name: string): Promise<CustomersRes> => {
    const query = db
      .select()
      .from(customers)
      .where(sql`lower(companyName) like '${sql.raw(name.toLowerCase())}%'`);
    const customers_ = await query;
    return { customers: customers_, query: query.toSQL() };
  };
}
