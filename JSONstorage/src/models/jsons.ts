import { MongoClient } from "mongodb";
import "dotenv/config.js";
const { MONGO_SERVER_URL } = process.env;
const dbClient = new MongoClient(MONGO_SERVER_URL!);
const dbName = "JSONstorage";
const collectionName = "JSONS";
const db = dbClient.db(dbName);
const jsonCollection = db.collection(collectionName);

export { jsonCollection };
