import {
  CoinBaseResponse,
  CoinMarketCapResponse,
  KucoinResponse,
  CoinPaprikaResponse,
  CoinStatsResponse,
  CoinStatsExchangeRate,
  CoinBaseExchangeRate,
  CoinMarketCapExchangeRate,
  KucoinExchangeRate,
  CoinPaprikaExchangeRate,
} from "../types/interfaces/MarketResponses/ExportAllMarketResponses.js";
import { cryptocurrencies } from "../db/schema/cryptocurrencies.js";
import { Currencies, currencies } from "../types/enums/currenciesEnum.js";
import { NewExchangeRate } from "../db/schema/exchangeRates.js";
import { Markets } from "../types/enums/marketsEnum.js";
export class FilterService {
  private constructor() {}
  private static instance: FilterService;
  public static getInstance(): FilterService {
    if (!FilterService.instance) {
      FilterService.instance = new FilterService();
    }
    return FilterService.instance;
  }

  convertUtcToMySqlLocal = (date: string): string => {
    const date_ = new Date(date);
    date_.setHours(date_.getHours() + 3);
    const mySqlDate = date_.toISOString().slice(0, 19).replace("T", " ");
    return mySqlDate;
  };

  filterCointStats = (marketResponse: CoinStatsResponse): NewExchangeRate[] => {
    const {
      data: { coins: exchangeRates },
    } = marketResponse;
    return exchangeRates.reduce((acc: NewExchangeRate[], exchangeRate: CoinStatsExchangeRate) => {
      const { symbol, price } = exchangeRate;
      if (currencies.includes(symbol)) {
        const market = Markets.CoinStats;
        const cryptocurrency = Currencies[symbol as keyof typeof Currencies];
        const conversionToUsd = price;
        const date = this.convertUtcToMySqlLocal(new Date().toISOString());
        const filtered: NewExchangeRate = {
          market,
          cryptocurrency,
          conversionToUsd,
          date,
        };
        acc.push(filtered);
      }
      return acc;
    }, []);
  };

  filterCoinBase = (marketResponse: CoinBaseResponse): NewExchangeRate[] => {
    const {
      data: {
        data: { rates: exchangeRates },
      },
    } = marketResponse;
    const filterdRates: NewExchangeRate[] = [];
    for (let currency in exchangeRates) {
      if (currencies.includes(currency)) {
        const conversionToUsd = 1 / exchangeRates[currency];
        const market = Markets.CoinBase;
        const cryptocurrency = Currencies[currency as keyof typeof Currencies];
        const date = this.convertUtcToMySqlLocal(new Date().toISOString());
        const filtered: NewExchangeRate = {
          market,
          cryptocurrency,
          conversionToUsd,
          date,
        };
        filterdRates.push(filtered);
      }
    }
    return filterdRates;
  };

  filterCoinMarketCap = (marketResponse: CoinMarketCapResponse): NewExchangeRate[] => {
    const {
      data: { data: exchangeRates },
    } = marketResponse;
    return exchangeRates.reduce((acc: NewExchangeRate[], exchangeRate: CoinMarketCapExchangeRate) => {
      const {
        symbol,
        quote: {
          USD: { price, last_updated: lastUpdated },
        },
      } = exchangeRate;
      if (currencies.includes(symbol)) {
        const conversionToUsd = price;
        const market = Markets.CoinMarketCap;
        const cryptocurrency = Currencies[symbol as keyof typeof Currencies];
        const date = this.convertUtcToMySqlLocal(lastUpdated);
        const filtered: NewExchangeRate = {
          market,
          cryptocurrency,
          conversionToUsd,
          date,
        };
        acc.push(filtered);
      }
      return acc;
    }, []);
  };

  filterKucoin = (marketResponse: KucoinResponse): NewExchangeRate[] => {
    const {
      data: { data: exchangeRates },
    } = marketResponse;
    const filterdRates: NewExchangeRate[] = [];
    for (let currency in exchangeRates) {
      if (currencies.includes(currency)) {
        const price = exchangeRates[currency];
        const conversionToUsd = price;
        const market = Markets.Kucoin;
        const cryptocurrency = Currencies[currency as keyof typeof Currencies];
        const date = this.convertUtcToMySqlLocal(new Date().toISOString());
        const filtered: NewExchangeRate = {
          market,
          cryptocurrency,
          conversionToUsd,
          date,
        };
        filterdRates.push(filtered);
      }
    }
    return filterdRates;
  };

  filterCoinPaprika = (marketResponse: CoinPaprikaResponse): NewExchangeRate[] => {
    const { data: exchangeRates } = marketResponse;
    return exchangeRates.reduce((acc: NewExchangeRate[], exchangeRate: CoinPaprikaExchangeRate) => {
      const {
        symbol,
        last_updated: lastUpdated,
        quotes: {
          USD: { price },
        },
      } = exchangeRate;
      if (currencies.includes(symbol)) {
        const conversionToUsd = price;
        const market = Markets.CoinPaprika;
        const cryptocurrency = Currencies[symbol as keyof typeof Currencies];
        const date = this.convertUtcToMySqlLocal(lastUpdated);
        const filtered: NewExchangeRate = {
          market,
          cryptocurrency,
          conversionToUsd,
          date,
        };
        acc.push(filtered);
      }
      return acc;
    }, []);
  };
}
