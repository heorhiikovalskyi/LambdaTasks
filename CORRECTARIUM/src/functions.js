const extensions = ["doc", "docx", "rtf"];
const startHour = 10;
const endHour = 19;
const dayDuration = endHour - startHour;
export const getPrice = (Language, symbolsCount, extension) => {
  let price = Language.oneSymbolPrice * symbolsCount;
  if (!extensions.includes(extension)) {
    price *= 1.2;
  }
  if (price < Language.minimumPrice) {
    price = Language.minimumPrice;
  }
  return price;
};

export const getWorkDuration = (language, symbolsCount, extension) => {
  let time = symbolsCount / language.hourVelocity + 0.5;
  if (!extensions.includes(extension)) {
    time *= 1.2;
  }
  if (time < 1) {
    time = 1;
  }
  return time;
};

const shiftDeadline = (date, days) => {
  const dateDay = date.getDate();
  date.setDate(dateDay + days);
  date.setHours(startHour, 0, 0);
};

const skipNonWorkingTime = (date) => {
  if (date.getHours() < startHour) {
    date.setHours(startHour, 0, 0);
  } else if (date.getHours() >= endHour) {
    shiftDeadline(date, 1);
  }
  if (date.getDay() === 0) {
    shiftDeadline(date, 1);
  } else if (date.getDay() === 6) {
    shiftDeadline(date, 2);
  }
};

const shiftDeadlineFromDayStart = (deadline) => {
  deadline.setDate(deadline.getDate() - 1);
  if (deadline.getDay() === 0) {
    deadline.setDate(deadline.getDate() - 2);
  }
  deadline.setHours(endHour, 0, 0);
};

export const getDeadline = (workDuration, date) => {
  skipNonWorkingTime(date);
  const dateHour = date.getHours();
  const dateMin = date.getMinutes();
  const hoursTillDayEnd = endHour - dateHour - dateMin / 60;
  if (workDuration <= hoursTillDayEnd) {
    date.setTime(date.getTime() + 3600000 * workDuration);
  } else {
    let backlog = workDuration;
    shiftDeadline(date, 1);
    backlog -= hoursTillDayEnd;
    skipNonWorkingTime(date);
    while (backlog >= dayDuration) {
      const dateDay = date.getDay();
      if (dateDay === 5) {
        shiftDeadline(date, 3);
      } else {
        shiftDeadline(date, 1);
      }
      backlog -= dayDuration;
    }
    date.setTime(date.getTime() + 3600000 * backlog);
    if (date.getHours() === startHour && date.getMinutes() === 0) {
      shiftDeadlineFromDayStart(date);
    }
  }
  return date;
};
