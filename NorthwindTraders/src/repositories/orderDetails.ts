import { gte, eq } from "drizzle-orm";
import { orderDetails } from "../db/schema/orderDetails.js";
import { db } from "../db/db.js";
import { OrderDetailsRes } from "../controllers/types.js";
import { products } from "../db/schema/products.js";

export class OrderDetailsRepo {
  private constructor() {}
  private static instance: OrderDetailsRepo;
  public static getInstance(): OrderDetailsRepo {
    if (!OrderDetailsRepo.instance) {
      OrderDetailsRepo.instance = new OrderDetailsRepo();
    }
    return OrderDetailsRepo.instance;
  }

  getByOrder = async (orderId: number): Promise<OrderDetailsRes> => {
    const query = db
      .select()
      .from(orderDetails)
      .where(eq(orderDetails.orderId, orderId))
      .leftJoin(products, eq(orderDetails.productId, products.id));
    const orderDetails_ = await query;
    return { orderDetails: orderDetails_, query: query.toSQL() };
  };
}
