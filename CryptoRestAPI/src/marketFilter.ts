import "dotenv/config.js";
import { FilterService } from "./services/filterService.js";
const { COIN_MARKET_CAP_API_KEY } = process.env;

const filterService = FilterService.getInstance();

export const marketFilter = [
  {
    url: "http://api.coinstats.app/public/v1/coins?currency=USD",
    filter: filterService.filterCointStats,
  },
  {
    url: `http://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${COIN_MARKET_CAP_API_KEY}`,
    filter: filterService.filterCoinMarketCap,
  },
  {
    url: "http://api.coinbase.com/v2/exchange-rates",
    filter: filterService.filterCoinBase,
  },
  {
    url: "http://api.kucoin.com./api/v1/prices",
    filter: filterService.filterKucoin,
  },
  {
    url: "http://api.coinpaprika.com/v1/tickers",
    filter: filterService.filterCoinPaprika,
  },
];
