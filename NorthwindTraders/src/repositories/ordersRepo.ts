import { gte } from "drizzle-orm";
import { orders } from "../db/schema/orders.js";
import { db } from "../db/db.js";
import { OrdersRes } from "../controllers/types.js";

export class OrdersRepo {
  private constructor() {}
  private static instance: OrdersRepo;
  public static getInstance(): OrdersRepo {
    if (!OrdersRepo.instance) {
      OrdersRepo.instance = new OrdersRepo();
    }
    return OrdersRepo.instance;
  }

  getOrders = async (startId: number, count: number): Promise<OrdersRes> => {
    const query = db.select().from(orders).where(gte(orders.id, startId)).limit(count);
    const orders_ = await query;
    return { orders: orders_, query: query.toSQL() };
  };
}
