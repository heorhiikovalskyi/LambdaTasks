import { gte, like, and, sql } from "drizzle-orm";
import { products } from "../db/schema/products.js";
import { db } from "../db/db.js";
import { Product } from "../db/schema/products.js";
import { ProductsRes } from "../controllers/types.js";

export class ProductsRepo {
  private constructor() {}
  private static instance: ProductsRepo;
  public static getInstance(): ProductsRepo {
    if (!ProductsRepo.instance) {
      ProductsRepo.instance = new ProductsRepo();
    }
    return ProductsRepo.instance;
  }

  getProducts = async (startId: number, count: number): Promise<ProductsRes> => {
    const query = db.select().from(products).where(gte(products.id, startId)).limit(count);
    const products_ = await query;
    return { products: products_, query: query.toSQL() };
  };

  getProductsByName = async (name: string): Promise<ProductsRes> => {
    const query = db
      .select()
      .from(products)
      .where(sql`lower(productName) like '${sql.raw(name.toLowerCase())}%'`);
    const products_ = await query;
    return { products: products_, query: query.toSQL() };
  };
}
