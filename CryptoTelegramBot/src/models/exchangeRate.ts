import axios from "axios";
import { averageExchange } from "../interfaces/averageExchange.js";

export function GetCurrencyAverageExchangeRate(
  time: number,
  currency: string
): Promise<Array<{ "average price (USD)": string | "no rates for this currency" }>> {
  return new Promise(async (resolve, reject) => {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/exchangeRates?time=${time}m&currency=${currency}`,
      responseType: "json",
    }).catch((err) => reject(err));
    resolve(response?.data);
  });
}

export function GetAllCurrenciesAverageExchangeRates(time: number): Promise<Array<averageExchange>> {
  return new Promise(async (resolve, reject) => {
    const response = await axios({
      method: "get",
      url: `http://localhost:3000/exchangeRates?time=${time}m`,
      responseType: "json",
    }).catch((err) => reject(err));
    resolve(response?.data);
  });
}
