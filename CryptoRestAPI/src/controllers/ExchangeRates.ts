import axios from "axios";
import { mysqlconnectionsPool } from "../mysql.js";
import { CallbacksForDiffMarketResponses, markets } from "../Markets.js";
import { Request, Response } from "express";
import { getCurrencies } from "../models/currencies.js";
import { UserQuery } from "../interfaces/UserQuery.js";
import {
  GetExchangeRatesBasedOnMarket,
  GetAverageExchangeRates,
} from "../models/exchangeRates.js";

const currencies = await getCurrencies();

function isUserQuery(object: unknown): object is UserQuery {
  if (object != null && typeof object === "object") {
    return "currency" in object! && "time" in object!;
  }
  return false;
}

async function ErrorHandler(err: any, req: Request, res: Response, next: any) {
  if (err.code === 400) return res.status(err.code).send(err.message);
  else {
    console.log(err);
    return res.sendStatus(500);
  }
}

function GetMinutes(time: string): number {
  const hIndex = time.indexOf("h");
  return hIndex > 0 ? +time.split("h")[0] * 60 : +time.split("m")[0];
}

function ValidateUserInput(userQuery: UserQuery) {
  if (!currencies.includes(userQuery.currency))
    return {
      message: "No such currency",
      code: 400,
    };
  if (!/^\d+(h|m)/.test(userQuery.time))
    return {
      message: "No such time period. Try 45m or 2h for example",
      code: 400,
    };
  return "all right";
}

async function GetMarketRates(res: Response, userQuery: UserQuery) {
  res.status(200).json(
    await GetExchangeRatesBasedOnMarket(
      GetMinutes(userQuery.time),
      markets.indexOf(userQuery.market!) + 1,
      userQuery.currency
    ).catch((err) => {
      throw err;
    })
  );
}

async function GetAverageRate(userQuery: UserQuery, res: Response) {
  const averageExchangee = await GetAverageExchangeRates(
    GetMinutes(userQuery.time),
    userQuery.currency
  ).catch((err) => {
    throw err;
  });
  const averageExchange = averageExchangee["AVG(conversiontoUSD)"];
  res.status(200).json({
    "average exchange rate (USD)": averageExchange
      ? averageExchange
      : "no rates, change time",
  });
}

export async function GetExchangeRates(
  request: Request,
  res: Response,
  next: any
) {
  const userQuery = request.query;
  if (!isUserQuery(userQuery))
    return next({
      message: "Need currency and time period: currency=BTC&time=45m",
      code: 400,
    });
  const validationResult = ValidateUserInput(userQuery);
  if (validationResult != "all right") return next(validationResult);
  if (typeof userQuery.market === "undefined")
    return GetAverageRate(userQuery, res).catch((err) => next(err));
  userQuery.market = userQuery.market.toLowerCase();
  if (!markets.includes(userQuery.market))
    return next({ message: "No such market", code: 400 });
  return GetMarketRates(res, userQuery).catch((err) => next(err));
}

function UpdateDB() {
  CallbacksForDiffMarketResponses.forEach((element) => {
    axios({
      method: "get",
      url: element.url,
      responseType: "json",
    })
      .then((response) => {
        return element.callback(response);
      })
      .then((insertQuery) => {
        insertQuery = insertQuery.slice(0, -2);
        insertQuery += ";";
        mysqlconnectionsPool.query(insertQuery, (error, result) => {
          if (error) console.log(error);
        });
      })
      .catch((err) => console.log(err));
  });
}
export { UpdateDB, currencies, ErrorHandler };
