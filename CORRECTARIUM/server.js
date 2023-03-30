import bodyParser from "body-parser";
import express from "express";
import { GetPrice, GetDeadline, GetWorkingTime } from "./index.js";
import { Language } from "./classes.js";
const Ukrainian = new Language(0.05, 50, 1333);
const English = new Language(0.12, 120, 333);
const Russian = new Language(0.05, 50, 1333);
const languages = { ukr: Ukrainian, en: English, rus: Russian };
const app = express();
const PORT = 3000;

app.listen(PORT);
app.use(bodyParser.json());
app.post("/", (req, res) => {
  const language = languages[req.body.language];
  const extension = req.body.mimetype;
  const symbolsCount = req.body.count;
  const workingTime = GetWorkingTime(language, symbolsCount, extension);
  const price = GetPrice(language, symbolsCount, extension);
  const deadline = GetDeadline(workingTime, new Date());
  res
    .status(200)
    .send({
      price: price.toFixed(2),
      time: workingTime.toFixed(2),
      deadline: Math.floor(deadline.getTime() / 1000),
      deadline_date: deadline.toLocaleString(),
    });
});
