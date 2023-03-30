import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const app = express();
const PORT = 4000;

app.listen(PORT);
app.use(express.json());

app.get(/\/me[0-9]/, (req, res) => {
  const authHeader = req.body.Authorization;
  if (authHeader == null) return res.sendStatus(401);
  const accessToken = authHeader.split(" ")[1];
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    const request_num = req.url.slice(-1);
    res.json({ data: { username: user.email }, request_num: request_num });
  });
});
