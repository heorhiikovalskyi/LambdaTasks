import { MongoClient } from 'mongodb'
import "dotenv/config.js"
const DBclient = new MongoClient(process.env.MONGO_SERVER_URL!);
const dbName = 'JSONstorage';
const collectionName = 'JSONS'
const db = DBclient.db(dbName);
const JSONcollection = db.collection(collectionName);


export{
    JSONcollection
}