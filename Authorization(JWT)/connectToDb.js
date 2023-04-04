export const connectToDb = async (mongoClient) => {
  await mongoClient.connect();
  console.log("Connected successfully to MongoDB server");
};
