export interface CoinBaseExchangeRate {
  [key: string]: number;
}

export interface CoinBaseResponse {
  data: { data: { rates: CoinBaseExchangeRate } };
}
