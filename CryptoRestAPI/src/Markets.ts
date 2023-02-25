import "dotenv/config.js";
import {
  MakeCoinStatsInsertQuery,
  MakeCoinMarketCapInsertQuery,
  MakeCoinBaseInsertQuery,
  MakeKucoinInsertQuery,
  MakeCoinPaprikaInsertQuery,
} from "./MakeInsertQueryForDiffMarkets.js";
enum Markets {
  CoinMarketCap = 1,
  CoinBase,
  CoinStats,
  Kucoin,
  CoinPaprika,
}

const markets = [
  "coinmarketcap",
  "coinbase",
  "coinstats",
  "kucoin",
  "coinpaprika",
];

export const CallbacksForDiffMarketResponses = [
  {
    url: "http://api.coinstats.app/public/v1/coins?currency=USD",
    callback: MakeCoinStatsInsertQuery,
  },
  {
    url: `http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${process.env.CoinMarketCapAPIkey}`,
    callback: MakeCoinMarketCapInsertQuery,
  },
  {
    url: "http://api.coinbase.com/v2/exchange-rates",
    callback: MakeCoinBaseInsertQuery,
  },
  {
    url: "http://api.kucoin.com./api/v1/prices",
    callback: MakeKucoinInsertQuery,
  },
  {
    url: "http://api.coinpaprika.com/v1/tickers",
    callback: MakeCoinPaprikaInsertQuery,
  },
];

export { Markets, markets };
