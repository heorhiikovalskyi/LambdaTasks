import type { Config } from "drizzle-kit";
import "dotenv/config.js";

const { SQL_PASSWORD, SQL_USER, SQL_HOST, DB } = process.env;

export default {
  //schema: "./schema.ts",
  // connectionString: process.env.DB_URL,
  host: SQL_HOST,
  user: SQL_USER,
  password: SQL_PASSWORD,
  database: DB,
};
