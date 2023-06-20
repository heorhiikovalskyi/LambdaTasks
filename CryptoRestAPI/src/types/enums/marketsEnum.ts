export enum Markets {
  CoinMarketCap = 1,
  CoinBase,
  CoinStats,
  Kucoin,
  CoinPaprika,
}

let markets: string[] = Object.keys(Markets).filter((key) => isNaN(Number(key)));
markets = markets.map((market) => market.toLowerCase());

export { markets };
