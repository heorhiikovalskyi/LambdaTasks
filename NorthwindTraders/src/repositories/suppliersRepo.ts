import { gte, eq } from "drizzle-orm";
import { suppliers } from "../db/schema/suppliers.js";
import { db } from "../db/db.js";
import { Supplier } from "../db/schema/suppliers.js";
import { SupplierRes, SuppliersRes } from "../controllers/types.js";

export class SuppliersRepo {
  private constructor() {}
  private static instance: SuppliersRepo;
  public static getInstance(): SuppliersRepo {
    if (!SuppliersRepo.instance) {
      SuppliersRepo.instance = new SuppliersRepo();
    }
    return SuppliersRepo.instance;
  }

  getSuppliers = async (startId: number, count: number): Promise<SuppliersRes> => {
    const query = db.select().from(suppliers).where(gte(suppliers.id, startId)).limit(count);
    const suppliers_ = await query;
    return { suppliers: suppliers_, query: query.toSQL() };
  };

  getSupplier = async (id: number): Promise<SupplierRes> => {
    const query = db.select().from(suppliers).where(eq(suppliers.id, id));
    const supplier = (await query)[0];
    return { supplier, query: query.toSQL() };
  };
}
