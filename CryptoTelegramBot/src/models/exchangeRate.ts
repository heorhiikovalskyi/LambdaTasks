import axios from "axios";
import { averageExchange } from "../interfaces/averageExchange.js";
import "dotenv/config.js";
const { API_ENDPOINT } = process.env;
export const getCurrencyAverageExchangeRate = (
  time: number,
  currency: string
): Promise<Array<{ "average price (USD)": string | "no rates for this currency" }>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: API_ENDPOINT + `exchangeRates?time=${time}m&currency=${currency}`,
        responseType: "json",
      });
      const { data: rate } = response;
      resolve(rate);
    } catch (err) {
      reject(err);
    }
  });
};

export const getAllCurrenciesAverageExchangeRates = (time: number): Promise<Array<averageExchange>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: API_ENDPOINT + `exchangeRates?time=${time}m`,
        responseType: "json",
      });
      const { data: exchanges } = response;
      resolve(exchanges);
    } catch (err) {
      reject(err);
    }
  });
};
