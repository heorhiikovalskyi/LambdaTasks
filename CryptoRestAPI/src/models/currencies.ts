import { mySqlConnectionsPool } from "../mysql.js";

export function getCurrencies(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    mySqlConnectionsPool.query(`SELECT symbol FROM cryptocurrency`, (err: any, results: { symbol: string }[]) => {
      let currencies: string[] = [];
      results.forEach((row: { symbol: string }) => currencies.push(row.symbol));
      return err ? reject(err) : resolve(currencies);
    });
  });
}
