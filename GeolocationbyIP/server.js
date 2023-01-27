//ngrok endpoint: https://12ad-85-118-78-199.eu.ngrok.io 
import express from 'express'
import {readFileSync} from 'fs'
import {BinarySearch, IPToDecimal} from './IPfunctions.js'
const app = express()
const IP_BASE = 'IP2LOCATION-LITE-DB1.CSV'
const IPMatrix = readFileSync(`./${IP_BASE}`, 'utf8').split("\n")
const PORT = 3000
MakeMatrix()
function MakeMatrix(){
    for(let i = 0; i < IPMatrix.length; i++){
        IPMatrix[i] = IPMatrix[i].split(",")
        for (let j = 0; j < 3; j++){
            IPMatrix[i][j] = IPMatrix[i][j].replace(/"/g, '')          
        }
        IPMatrix[i][3] = IPMatrix[i][3].trim('\r').replace(/"/g, '')
    }
    }

app.listen(PORT)
app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const IPtoCountry = BinarySearch(IPMatrix, IPToDecimal(ip))
    res.status(200).send({"country": IPtoCountry[3],
    "IP": ip,
    "range": [IPtoCountry[0], IPtoCountry[1]]
    })
})
