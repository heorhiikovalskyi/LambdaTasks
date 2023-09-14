import axios from "axios";
import { Request, Response } from "express";
import { marketFilter } from "../marketFilter.js";
import { Markets, markets } from "../types/enums/marketsEnum.js";
import { UserQuery } from "../types/interfaces/userQuery.js";
import { ExchangeRatesRepo } from "../repositories/exchangesRepo.js";
import { Currencies } from "../types/enums/currenciesEnum.js";
import { currencies } from "../types/enums/currenciesEnum.js";
import { ExchangeRate } from "../db/schema/exchangeRates.js";
const exchangeRatesRepo = ExchangeRatesRepo.getInstance();

const getMinutes = (time: string): number => {
  const hIndex = time.indexOf("h");
  return hIndex > 0 ? +time.split("h")[0] * 60 : +time.split("m")[0];
};

const getMarketRates = async (res: Response, time: number, market: string, currency: string) => {
  const marketId = markets.indexOf(market) + 1;
  const currencyId = Currencies[currency as keyof typeof Currencies];
  try {
    const marketExchanges = await exchangeRatesRepo.getMarketExchanges(time, marketId, currencyId);
    const marketExchangesToView = marketExchanges.map(({ date, conversionToUsd }) => ({
      date,
      conversionToUsd,
    }));
    res.status(200).json(marketExchangesToView);
  } catch (err) {
    throw err;
  }
};

const getAverageRates = async (time: number, currency: string | undefined, res: Response) => {
  try {
    let averageExchanges;
    if (currency) {
      const currencyId = Currencies[currency as keyof typeof Currencies];
      averageExchanges = await exchangeRatesRepo.getCurrencyAverageExchanges(time, currencyId);
    } else {
      averageExchanges = await exchangeRatesRepo.getCurrenciesAverageExchanges(time);
    }
    res.status(200).json(averageExchanges);
  } catch (err) {
    throw err;
  }
};

export const sendCurrencies = (request: Request, res: Response, next: any) => {
  res.status(200).json(currencies);
};

export const getExchangeRates = async (req: Request, res: Response, next: any) => {
  const { query: userQuery } = req;
  const { time, currency } = userQuery as unknown as UserQuery;
  let { market } = userQuery as unknown as UserQuery;
  const minutesTime = getMinutes(time);
  try {
    if (!market) {
      return await getAverageRates(minutesTime, currency, res);
    }
    market = market.toLowerCase();
    return await getMarketRates(res, minutesTime, market, currency as string);
  } catch (err) {
    next(err);
  }
};

export const updateDb = () => {
  marketFilter.forEach(async (element) => {
    const { url, filter } = element;
    try {
      const response = await axios({
        method: "get",
        url: url,
        responseType: "json",
      });
      const exchanges = filter(response);
      // console.log(exchanges);
      await exchangeRatesRepo.insert(exchanges);
    } catch (err) {
      console.log(err);
    }
  });
};
