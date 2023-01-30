import express from 'express'
import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
import "dotenv/config.js"
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Users';
let db 
let collection 

async function ConnectToDB() {
    await client.connect()
    console.log('Connected successfully to MongoDB server');
    db = client.db(dbName);
    collection = db.collection('users');
  }
    
const app = express()
const PORT = 3000

app.listen(PORT)
app.use(express.json())

app.post('/sign_up', async (req, res) => {
    const user = {email: req.body.email, password: req.body.password}
    await collection.insertOne(user)
    res.status(200).send()
})

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

app.post('/login', async (req, res) => {
    const user = req.query
    if (await collection.count(user) == 0){
        res.sendStatus(401)
    }
    else{
        const accessToken = GenerateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        res.json({accessToken: accessToken, refreshToken: refreshToken})
    }  
})

function GenerateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: getRndInteger(30, 60)})
}

app.post('/refresh', (req, res) => {
    const authHeader = req.body.Authorization
    if (authHeader == null) return res.sendStatus(401)  
    const refreshToken = authHeader.split(" ")[1]
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = GenerateAccessToken({email: user.email, password: user.password})
        res.json({accessToken: accessToken})
    })
})

await ConnectToDB()
    .catch(console.error)
