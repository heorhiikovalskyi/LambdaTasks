import { mysqlconnectionsPool } from "../mysql.js";
import { AverageExchange } from "../interfaces/sql.js";
//import { currencies } from "../controllers/ExchangeRates.js";
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

function GetAverageExchangeRates(time: number, currency: string | undefined) {
  let query: string;
  if (currency)
    query = `SELECT IFNULL(AVG(conversiontoUSD), 'no rates for this currency')
  as "average price (USD)" FROM exchangerate 
  WHERE timestampdiff(minute, date, now()) <= ${time} 
  AND cryptocurrency = (SELECT id FROM Cryptocurrency 
  WHERE symbol = '${currency}');`;
  else
    query = `select symbol, avg(conversiontousd) as "average price (USD)" 
             from exchangerate left join cryptocurrency 
             on exchangerate.cryptocurrency = cryptocurrency.id
             where timestampdiff(minute, date, now()) < ${time}  group by cryptocurrency;`;
  return new Promise((resolve, reject) => {
    mysqlconnectionsPool.query(
      query,
      function (err: any, result: any, fields: any) {
        return err ? reject(err) : resolve(result);
      }
    );
  });
}

export { GetExchangeRatesBasedOnMarket, GetAverageExchangeRates };
