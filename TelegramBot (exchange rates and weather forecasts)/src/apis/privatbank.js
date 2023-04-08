import "dotenv/config.js";
const { PRIVAT_ENDPOINT } = process.env;
import axios from "axios";
export const getPrivatExchanges = async (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const privatEndpoint = PRIVAT_ENDPOINT + `${day}.${month}.${year}`;

  const response = await axios.get(privatEndpoint).catch((err) => {
    throw new Error(`Error in getting Privat exchanges, ${JSON.stringify(err)}`);
  });
  const {
    data: { exchangeRate: exchanges },
  } = response;
  return exchanges;
};
