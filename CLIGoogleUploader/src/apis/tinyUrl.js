import "dotenv/config.js";
import axios from "axios";
const { SHORT_URL_ENDPOINT, SHORT_URL_API_TOKEN } = process.env;
export const shortUrl = async (url) => {
  const { data: short } = await axios({
    method: "post",
    url: SHORT_URL_ENDPOINT + `${url}`,
    data: {
      url: url,
      tags: "____",
      expires_at: null,
    },
    api_token: SHORT_URL_API_TOKEN,
  });
  return short;
};
