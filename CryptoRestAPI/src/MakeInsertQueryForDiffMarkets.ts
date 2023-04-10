import {
  CoinBaseResponse,
  CoinMarketCapResponse,
  KucoinResponse,
  CoinPaprikaResponse,
  CoinStatsResponse,
} from "./interfaces/MarketResponses/ExportAllMarketResponses.js";
import { Markets } from "./markets.js";
import { currencies } from "./controllers/exchangeRates.js";
const convertUtcToMySqlLocal = (date: string): string => {
  const date_ = new Date(date);
  date_.setHours(date_.getHours() + 2);
  const mySqlDate = date_.toISOString().slice(0, 19).replace("T", " ");
  return mySqlDate;
};
export const makeCoinStatsInsertQuery = (marketResponse: CoinStatsResponse) => {
  const market = Markets.CoinStats;
  const {
    data: { coins: exchangeRates },
  } = marketResponse;
  let query = "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  exchangeRates.forEach((exchangeRate) => {
    const { symbol, price } = exchangeRate;
    if (currencies.includes(symbol)) {
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${symbol}'),
                ${price}, now()), `;
    }
  });
  return query;
};

export const makeCoinMarketCapInsertQuery = (marketResponse: CoinMarketCapResponse) => {
  const market = Markets.CoinMarketCap;
  const {
    data: { data: exchangeRates },
  } = marketResponse;
  let query = "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  exchangeRates.forEach((exchangeRate) => {
    const { symbol } = exchangeRate;
    if (currencies.includes(symbol)) {
      console.log(exchangeRate.quote.USD.last_updated);
      let { price, last_updated: lastUpdated } = exchangeRate.quote.USD;
      lastUpdated = convertUtcToMySqlLocal(lastUpdated);
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${symbol}'),
                ${price}, '${lastUpdated}'), `;
    }
  });
  return query;
};

export const makeCoinBaseInsertQuery = (marketResponse: CoinBaseResponse) => {
  const market = Markets.CoinBase;
  const {
    data: {
      data: { rates: exchangeRates },
    },
  } = marketResponse;
  let query = "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  for (let currency in exchangeRates) {
    if (currencies.includes(currency)) {
      const conversiontoUSD = 1 / exchangeRates[currency];
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${currency}'),
                ${conversiontoUSD}, now()), `;
    }
  }
  return query;
};

export const makeKucoinInsertQuery = (marketResponse: KucoinResponse) => {
  const market = Markets.Kucoin;
  const {
    data: { data: exchangeRates },
  } = marketResponse;
  let query = "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  for (let currency in exchangeRates) {
    if (currencies.includes(currency)) {
      const conversiontoUSD = exchangeRates[currency];
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${currency}'),
                  ${conversiontoUSD}, now()), `;
    }
  }
  return query;
};

export const makeCoinPaprikaInsertQuery = (marketResponse: CoinPaprikaResponse) => {
  const market = Markets.CoinPaprika;
  const { data: exchangeRates } = marketResponse;
  let query = "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  exchangeRates.forEach((exchangeRate) => {
    const { symbol, last_updated: lastUpdated } = exchangeRate;
    const { price } = exchangeRate.quotes.USD;
    if (currencies.includes(symbol)) {
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${symbol}'),
                ${price}, '${convertUtcToMySqlLocal(lastUpdated)}'), `;
    }
  });
  return query;
};
