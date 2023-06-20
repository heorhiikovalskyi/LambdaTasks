export interface CoinStatsExchangeRate {
  symbol: string;
  price: number;
}

export interface CoinStatsResponse {
  data: { coins: Array<CoinStatsExchangeRate> };
}
