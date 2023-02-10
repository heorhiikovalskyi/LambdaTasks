import { MongoClient } from 'mongodb'

async function ConnectToDB(url: string){
    const client = new MongoClient(url);
    await client.connect()
    console.log('Connected successfully to MongoDB server');
  }

export {
    ConnectToDB
}