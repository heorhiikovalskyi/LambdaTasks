import mysql from "mysql2";
import "dotenv/config.js";

const connectionsPool = mysql.createPool({
  host: process.env.SQLserverHost,
  user: process.env.SQLserverUser,
  password: process.env.SQLserverPassword,
  database: process.env.Database,
});

export { connectionsPool };
