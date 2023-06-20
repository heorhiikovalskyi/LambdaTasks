export interface KucoinExchangeRate {
  [key: string]: number;
}

export interface KucoinResponse {
  data: { data: KucoinExchangeRate };
}
