export const createExchangesMessage = (exchanges) => {
  const { rateBuy: euroRateBuy, rateSell: euroRateSell } = exchanges[0];
  const { rateBuy: usdRateBuy, rateSell: usdRateSell } = exchanges[1];
  return `Купівля/Продаж

    EUR
    ${euroRateBuy.toFixed(3)}/${euroRateSell.toFixed(3)}
    USD
    ${usdRateBuy.toFixed(3)}/${usdRateSell.toFixed(3)}`;
};

export const createForecastMessage = (weathers) => {
  const weekday = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
  let message = "Прогноз погоди у Києві:";
  let day = "";
  weathers.forEach((weather) => {
    let date = new Date(weather.dt_txt);
    const dateDay = date.getDay();
    if (day !== weekday[dateDay]) {
      day = weekday[dateDay];
      message += `\n\n${day}`;
    }
    const hour = date.getHours();
    const minutes = date.getMinutes();
    let { temp, feels_like: feelsLike } = weather.main;
    temp = temp.toFixed(0);
    feelsLike = feelsLike.toFixed(0);
    const { description } = weather.weather[0];
    message += `\n ${hour}:${minutes}0 Температура ${temp}, відчувається як ${feelsLike}, ${description}`;
  });
  return message;
};
