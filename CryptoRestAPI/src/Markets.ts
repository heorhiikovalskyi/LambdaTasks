import "dotenv/config.js";
import {
  makeCoinStatsInsertQuery,
  makeCoinMarketCapInsertQuery,
  makeCoinBaseInsertQuery,
  makeKucoinInsertQuery,
  makeCoinPaprikaInsertQuery,
} from "./makeInsertQueryForDiffMarkets.js";
const { COIN_MARKET_CAP_API_KEY } = process.env;
enum Markets {
  CoinMarketCap = 1,
  CoinBase,
  CoinStats,
  Kucoin,
  CoinPaprika,
}

const markets = ["coinmarketcap", "coinbase", "coinstats", "kucoin", "coinpaprika"];

export const callbacksForDiffMarketResponses = [
  {
    url: "http://api.coinstats.app/public/v1/coins?currency=USD",
    getQuery: makeCoinStatsInsertQuery,
  },
  {
    url: `http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${COIN_MARKET_CAP_API_KEY}`,
    getQuery: makeCoinMarketCapInsertQuery,
  },
  {
    url: "http://api.coinbase.com/v2/exchange-rates",
    getQuery: makeCoinBaseInsertQuery,
  },
  {
    url: "http://api.kucoin.com./api/v1/prices",
    getQuery: makeKucoinInsertQuery,
  },
  {
    url: "http://api.coinpaprika.com/v1/tickers",
    getQuery: makeCoinPaprikaInsertQuery,
  },
];

export { Markets, markets };
