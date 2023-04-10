import { mySqlConnectionsPool } from "../mysql.js";
export const getMarketExchanges = (time: number, market: number, currency: string) => {
  return new Promise((resolve, reject) => {
    mySqlConnectionsPool.query(
      `SELECT conversiontoUSD, date FROM exchangerate 
      WHERE timestampdiff(minute,date,now()) <= ? 
      AND market = ?
      AND cryptocurrency = (SELECT id FROM Cryptocurrency 
      WHERE symbol = ?);`,
      [time, market, currency],
      (err, exchangeRates) => {
        return err ? reject(err) : resolve(exchangeRates);
      }
    );
  });
};

export const getCurrencyAverageExchanges = (time: number, currency: string) => {
  let query: string;
  query = `SELECT IFNULL(AVG(conversiontoUSD), 'no rates for this currency')
  as "average price (USD)" FROM exchangerate 
  WHERE timestampdiff(minute, date, now()) <= ?
  AND cryptocurrency = (SELECT id FROM Cryptocurrency 
  WHERE symbol = ?);`;
  return new Promise((resolve, reject) => {
    mySqlConnectionsPool.query(query, [time, currency], (err, exchangeRates) => {
      return err ? reject(err) : resolve(exchangeRates);
    });
  });
};

export const getCurrenciesAverageExchanges = (time: number) => {
  let query: string;
  query = `select symbol, avg(conversiontousd) as "average price (USD)" 
             from exchangerate left join cryptocurrency 
             on exchangerate.cryptocurrency = cryptocurrency.id
             where timestampdiff(minute, date, now()) < ? group by cryptocurrency;`;

  return new Promise((resolve, reject) => {
    mySqlConnectionsPool.query(query, [time], (err, exchangeRates) => {
      return err ? reject(err) : resolve(exchangeRates);
    });
  });
};
