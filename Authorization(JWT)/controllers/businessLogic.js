import "dotenv/config.js";
const { ACCESS_TOKEN_SECRET } = process.env;
import { validToken } from "./auth.js";
export const validUser = (req, res, next) => {
  const authHeader = req.body.Authorization;
  const user = validToken(authHeader, ACCESS_TOKEN_SECRET);
  if (!user) return res.sendStatus(401);
  req.user = user;
  next();
};

export const getMockData = (req, res) => {
  const requestNum = req.url.slice(-1);
  const { email } = req.user;
  const response = { data: { username: email }, request_num: requestNum };
  res.json(response);
};
