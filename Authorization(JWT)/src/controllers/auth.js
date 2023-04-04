import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
const { MONGO_SERVER_URL, DB_NAME, COLLECTION_NAME, REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
const mongoClient = new MongoClient(MONGO_SERVER_URL);
const db = mongoClient.db(DB_NAME);
const usersCollection = db.collection(COLLECTION_NAME);
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getAccessToken = (user) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: getRndInteger(30, 60),
  });
};

export const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = { email: email, password: password };
  try {
    await usersCollection.insertOne(user);
  } catch (err) {
    return res.status(500).send();
  }
  res.status(200).send("You have signed up");
};

export const login = async (req, res) => {
  const user = req.query;
  let userCount;
  try {
    userCount = await usersCollection.count(user);
  } catch (err) {
    return res.sendStatus(500);
  }
  if (userCount === 0) {
    res.sendStatus(401);
  } else {
    const accessToken = getAccessToken(user);
    const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET);
    const response = { accessToken: accessToken, refreshToken: refreshToken };
    res.json(response);
  }
};

export const validToken = (authHeader, secret) => {
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    const { email, password } = jwt.verify(token, secret);
    const user = { email: email, password: password };
    return user;
  } catch (err) {
    return null;
  }
};

export const refreshToken = (req, res) => {
  const authHeader = req.body.Authorization;
  const user = validToken(authHeader, REFRESH_TOKEN_SECRET);
  if (!user) return res.sendStatus(401);
  const { email, password } = user;
  const accessToken = getAccessToken({
    email: email,
    password: password,
  });
  res.json({ accessToken: accessToken });
};
