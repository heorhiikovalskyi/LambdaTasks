import {
  CoinBaseResponse,
  CoinMarketCapResponse,
  KucoinResponse,
  CoinPaprikaResponse,
  CoinStatsResponse,
} from "./interfaces/MarketResponses/ExportAllMarketResponses";
import { Markets } from "./Markets.js";
import { currencies } from "./controllers/ExchangeRates.js";
export const MakeCoinStatsInsertQuery = (marketResponse: CoinStatsResponse) => {
  const market = Markets.CoinStats;
  const ExchangeRates = marketResponse.data.coins;
  let query =
    "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  ExchangeRates.forEach((exchangeRate) => {
    if (currencies.includes(exchangeRate.symbol)) {
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${exchangeRate.symbol}'),
                ${exchangeRate.price}, now()), `;
    }
  });
  return query;
};

export const MakeCoinMarketCapInsertQuery = (
  marketResponse: CoinMarketCapResponse
) => {
  const market = Markets.CoinMarketCap;
  const ExchangeRates = marketResponse.data.data;
  let query =
    "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  ExchangeRates.forEach((exchangeRate) => {
    if (currencies.includes(exchangeRate.symbol)) {
      console.log(exchangeRate.quote.USD.last_updated);
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${
        exchangeRate.symbol
      }'),
                ${exchangeRate.quote.USD.price}, '${ConvertUTCtoMySQLlocal(
        exchangeRate.quote.USD.last_updated
      )}'), `;
    }
  });
  return query;
};

export const MakeCoinBaseInsertQuery = (marketResponse: CoinBaseResponse) => {
  // console.log(marketResponse.data);
  const market = Markets.CoinBase;
  const ExchangeRates = marketResponse.data.data.rates;
  // console.log(ExchangeRates);
  let query =
    "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  for (let currency in ExchangeRates) {
    //console.log(`dsfdsfsdf${currencie}`);
    if (currencies.includes(currency)) {
      // console.log(`dsfdsfsdf${currencie}`);
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${currency}'),
                ${1 / ExchangeRates[currency]}, now()), `;
    }
  }
  return query;
};

export const MakeKucoinInsertQuery = (marketResponse: KucoinResponse) => {
  const market = Markets.Kucoin;
  const ExchangeRates = marketResponse.data.data;
  let query =
    "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  for (let currency in ExchangeRates) {
    if (currencies.includes(currency)) {
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${currency}'),
                  ${ExchangeRates[currency]}, now()), `;
    }
  }
  return query;
};

function ConvertUTCtoMySQLlocal(date: string): string {
  const date_ = new Date(date);
  date_.setHours(date_.getHours() + 2);
  return date_.toISOString().slice(0, 19).replace("T", " ");
}

export const MakeCoinPaprikaInsertQuery = (
  marketResponse: CoinPaprikaResponse
) => {
  const market = Markets.CoinPaprika;
  const ExchangeRates = marketResponse.data;
  let query =
    "INSERT INTO exchangerate (market, cryptocurrency, conversiontoUSD, date) VALUES ";
  ExchangeRates.forEach((exchangeRate) => {
    if (currencies.includes(exchangeRate.symbol)) {
      query += `(${market}, (SELECT id FROM cryptocurrency WHERE symbol = '${
        exchangeRate.symbol
      }'),
                ${exchangeRate.quotes.USD.price}, '${ConvertUTCtoMySQLlocal(
        exchangeRate.last_updated
      )}'), `;
    }
  });
  return query;
};
