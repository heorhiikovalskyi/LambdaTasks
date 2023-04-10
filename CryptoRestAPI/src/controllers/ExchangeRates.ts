import axios from "axios";
import { mySqlConnectionsPool } from "../mysql.js";
import { callbacksForDiffMarketResponses, markets } from "../markets.js";
import { Request, Response } from "express";
import { getCurrencies } from "../models/currencies.js";
import { UserQuery } from "../interfaces/userQuery.js";
import {
  getCurrenciesAverageExchanges,
  getCurrencyAverageExchanges,
  getMarketExchanges,
} from "../models/exchangeRates.js";
import { error } from "../interfaces/errors.js";
export const currencies = await getCurrencies();

function isUserQuery(object: unknown): object is UserQuery {
  if (object !== null && typeof object === "object") {
    return "time" in object!;
  }
  return false;
}

export const errorHandler = async (err: any, req: Request, res: Response, next: any) => {
  if (err.code === 400) {
    const { code, message } = err;
    return res.status(code).send(message);
  }
  console.log(err);
  return res.sendStatus(500);
};

const getMinutes = (time: string): number => {
  const hIndex = time.indexOf("h");
  return hIndex > 0 ? +time.split("h")[0] * 60 : +time.split("m")[0];
};

const validateUserInput = (userQuery: UserQuery): string | error => {
  const { currency, time } = userQuery;
  if (currency && !currencies.includes(currency)) {
    return {
      message: "No such currency",
      code: 400,
    };
  }
  if (!/^\d+(h|m)/.test(time)) {
    return {
      message: "No such time period. Try 45m or 2h for example",
      code: 400,
    };
  }
  return "all right";
};

const getMarketRates = async (res: Response, time: number, market: string, currency: string) => {
  const marketExchanges = await getMarketExchanges(time, markets.indexOf(market) + 1, currency).catch((err) => {
    throw err;
  });
  res.status(200).json(marketExchanges);
};

const getAverageRates = async (time: number, currency: string | undefined, res: Response) => {
  let averageExchanges;
  try {
    if (currency) {
      averageExchanges = await getCurrencyAverageExchanges(time, currency);
    } else {
      averageExchanges = await getCurrenciesAverageExchanges(time);
    }
  } catch (err) {
    throw err;
  }
  res.status(200).json(averageExchanges);
};

export const sendCurrencies = (request: Request, res: Response, next: any) => {
  res.status(200).json(currencies);
};

export async function GetExchangeRates(req: Request, res: Response, next: any) {
  const { query: userQuery } = req;
  if (!isUserQuery(userQuery)) {
    const error = {
      message: "Need time period: time=45m",
      code: 400,
    };
    return next(error);
  }
  const validationResult = validateUserInput(userQuery);
  if (validationResult !== "all right") {
    return next(validationResult);
  }
  const { time, currency } = userQuery;
  let { market } = userQuery;
  const minutesTime = getMinutes(time);
  if (!market) {
    return getAverageRates(minutesTime, currency, res).catch((err) => next(err));
  }
  market = market.toLowerCase();
  if (!markets.includes(market)) {
    return next({ message: "No such market", code: 400 });
  }
  if (!currency) {
    return next({ message: "Need currency: currency=BTC", code: 400 });
  }
  return getMarketRates(res, minutesTime, market, currency).catch((err) => next(err));
}

export const updateDb = () => {
  callbacksForDiffMarketResponses.forEach(async (element) => {
    const { url, getQuery } = element;
    try {
      const response = await axios({
        method: "get",
        url: url,
        responseType: "json",
      });
      let insertQuery = getQuery(response);
      insertQuery = insertQuery.slice(0, -2);
      insertQuery += ";";
      mySqlConnectionsPool.query(insertQuery);
    } catch (err) {
      console.log(err);
    }
  });
};
