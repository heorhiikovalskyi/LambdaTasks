import { MongoClient } from "mongodb";

export const connectToDb = async (url: string) => {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Connected successfully to MongoDB server");
};
