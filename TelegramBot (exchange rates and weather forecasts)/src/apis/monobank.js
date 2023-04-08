import "dotenv/config.js";
import axios from "axios";
const { MONOBANK_ENDPOINT } = process.env;
export const getMonoExchanges = async () => {
  const response = await axios.get(MONOBANK_ENDPOINT).catch((err) => {
    throw new Error(`Error in getting Monobank exchanges, ${JSON.stringify(err)}`);
  });
  const { data: exchanges } = response;
  return exchanges;
};
