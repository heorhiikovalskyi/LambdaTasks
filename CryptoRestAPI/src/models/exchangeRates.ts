import { mysqlconnectionsPool } from "../mysql.js";
import { AverageExchange } from "../interfaces/sql.js";
function GetExchangeRatesBasedOnMarket(
  time: number,
  market: number,
  currency: string
) {
  return new Promise((resolve, reject) => {
    mysqlconnectionsPool.query(
      `SELECT conversiontoUSD, date FROM exchangerate 
      WHERE timestampdiff(minute,date,now()) <= ${time} 
      AND market = ${market} 
      AND cryptocurrency = (SELECT id FROM Cryptocurrency 
      WHERE symbol = '${currency}');`,
      function (err, exchangeRates, fields) {
        return err ? reject(err) : resolve(exchangeRates);
      }
    );
  });
}

function GetAverageExchangeRates(
  time: number,
  currency: string
): Promise<AverageExchange> {
  return new Promise((resolve, reject) => {
    mysqlconnectionsPool.query(
      `SELECT AVG(conversiontoUSD) FROM exchangerate 
        WHERE timestampdiff(minute, date, now()) <= ${time} 
        AND cryptocurrency = (SELECT id FROM Cryptocurrency 
        WHERE symbol = '${currency}');`,
      function (err: any, result: Array<AverageExchange>, fields: any) {
        return err ? reject(err) : resolve(result[0]);
      }
    );
  });
}

//const a: any = await GetExchangeRatesBasedOnMarket(100, 3, "BTC");
//console.log(a[0].conversiontoUSD);

export { GetExchangeRatesBasedOnMarket, GetAverageExchangeRates };
