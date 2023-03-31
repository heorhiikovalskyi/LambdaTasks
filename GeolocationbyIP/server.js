import "dotenv/config.js";
import express from "express";
import { readFileSync } from "fs";
import { binarySearch, ipToDecimal } from "./IPfunctions.js";
const app = express();
const { IP_BASE, PORT } = process.env;
const ipMatrix = readFileSync(`./${IP_BASE}`, "utf8").split("\n");
const makeMatrix = () => {
  for (let i = 0; i < ipMatrix.length; i++) {
    ipMatrix[i] = ipMatrix[i].split(",");
    for (let j = 0; j < 3; j++) {
      ipMatrix[i][j] = ipMatrix[i][j].replace(/"/g, "");
    }
    ipMatrix[i][3] = ipMatrix[i][3].trim("\r").replace(/"/g, "");
  }
};
makeMatrix();

app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const [startIp, endIp, country] = binarySearch(ipMatrix, ipToDecimal(ip));
  res.status(200).send({
    country: country,
    IP: ip,
    range: [startIp, endIp],
  });
});
app.listen(PORT);
