interface CoinMarketCapUSD {
  price: number;
  last_updated: string;
}

interface CoinMarketCapQuote {
  USD: CoinMarketCapUSD;
}

interface CoinMarketCapExchangeRate {
  symbol: string;
  quote: CoinMarketCapQuote;
}

export interface CoinMarketCapResponse {
  data: { data: Array<CoinMarketCapExchangeRate> };
}
