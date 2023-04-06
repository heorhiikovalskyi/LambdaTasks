import bodyParser from "body-parser";
import "dotenv/config.js";
import express from "express";
import { getPrice, getDeadline, getWorkDuration } from "./functions.js";
import { Language } from "./classes.js";
const { PORT } = process.env;
const Ukrainian = new Language(0.05, 50, 1333);
const English = new Language(0.12, 120, 333);
const Russian = new Language(0.05, 50, 1333);
const languages = { ukr: Ukrainian, en: English, rus: Russian };
const app = express();
app.use(bodyParser.json());
app.post("/", (req, res) => {
  const { body: reqBody } = req;
  let { language: language } = reqBody;
  language = languages[language];
  const { mimetype: extension, count: symbolsCount } = reqBody;
  const workDuration = getWorkDuration(language, symbolsCount, extension);
  const price = getPrice(language, symbolsCount, extension);
  const deadline = getDeadline(workDuration, new Date());
  res.status(200).send({
    price: price.toFixed(2),
    time: workDuration.toFixed(2),
    deadline: Math.floor(deadline.getTime() / 1000),
    deadline_date: deadline.toLocaleString(),
  });
});
app.listen(PORT);
