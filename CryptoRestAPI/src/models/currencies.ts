import { mysqlconnectionsPool } from "../mysql.js";

export function getCurrencies(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    mysqlconnectionsPool.query(
      `SELECT symbol FROM cryptocurrency`,
      function (err, results, fields) {
        let currencies: string[] = [];
        results.forEach((row: { symbol: string }) =>
          currencies.push(row.symbol)
        );
        return err ? reject(err) : resolve(currencies);
      }
    );
  });
}
