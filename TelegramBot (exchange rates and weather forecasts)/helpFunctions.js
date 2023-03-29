import axios from "axios";
import "dotenv/config.js";
async function GetCoord(city) {
  let coord;
  await axios
    .get(process.env.GET_COORD_ENDPOINT + `&q=${city}`)
    .then((response) => {
      coord = response.data.coord;
    });

  return { lon: coord.lon, lat: coord.lat };
}

function CreateExchangesMessage(exchanges) {
  return `Купівля/Продаж

    EUR
    ${exchanges[0].rateBuy}/${exchanges[0].rateSell}
    USD
    ${exchanges[1].rateBuy}/${exchanges[1].rateSell}`;
}

function CreateForecastMessage(weatherData) {
  const weekday = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П'ятниця",
    "Субота",
  ];
  let response = "Прогноз погоди у Києві:";
  let day = "";
  weatherData.forEach((weather) => {
    let date = new Date(weather.dt_txt);
    if (day != weekday[date.getDay()]) {
      day = weekday[date.getDay()];
      response += `\n\n${day}`;
    }
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const temp = weather.main.temp.toFixed(0);
    const feelsLike = weather.main.feels_like.toFixed(0);
    const weatherDescription = weather.weather[0].description;
    response += `\n ${hour}:${minutes}0 Температура ${temp}, відчувається як ${feelsLike}, ${weatherDescription}`;
  });
  return response;
}

export { GetCoord, CreateForecastMessage, CreateExchangesMessage };
