interface CoinPaprikaUSD {
  price: number;
}

interface CoinPaprikaQuotes {
  USD: CoinPaprikaUSD;
}

interface CoinPaprikaExchangeRate {
  symbol: string;
  quotes: CoinPaprikaQuotes;
  last_updated: string;
}

export interface CoinPaprikaResponse {
  data: Array<CoinPaprikaExchangeRate>;
}
