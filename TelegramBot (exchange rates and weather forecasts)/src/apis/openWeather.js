import "dotenv/config.js";
import axios from "axios";
const { GET_COORD_ENDPOINT, GET_WEATHER_ENDPOINT } = process.env;
export const getCoord = async (city) => {
  const response = await axios.get(GET_COORD_ENDPOINT + `&q=${city}`).catch((err) => {
    throw new Error(`Error in getting coord, ${JSON.stringify(err)}`);
  });
  const {
    data: { coord: coord },
  } = response;
  return { lon: coord.lon, lat: coord.lat };
};

export const getWeather = async (coord) => {
  const { lon, lat } = coord;
  const weatherEndpoint = GET_WEATHER_ENDPOINT + `&lat=${lat}&lon=${lon}`;
  const response = await axios.get(weatherEndpoint).catch((err) => {
    throw new Error(`Error in getting weather, ${JSON.stringify(err)}`);
  });
  const {
    data: { list: weather },
  } = response;
  return weather;
};
