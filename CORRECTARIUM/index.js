const extensions = ["doc", "docx", "rtf"];
const startHour = 10;
const endHour = 19;
const dayDuration = endHour - startHour;
const weekDuration = 5;
function GetPrice(Language, symbolsCount, extension) {
  let price = Language.onesymbolPrice * symbolsCount;
  if (!extensions.includes(extension)) {
    price *= 1.2;
  }
  if (price < Language.minimumPrice) {
    price = Language.minimumPrice;
  }
  return price;
}

function GetWorkingTime(Language, symbolsCount, extension) {
  let time = symbolsCount / Language.hourVelocity + 0.5;
  if (!extensions.includes(extension)) {
    time *= 1.2;
  }
  if (time < 1) {
    time = 1;
  }
  return time;
}

function SkipNonWorkingTime(date, flag) {
  const dateHour = date.getHours();
  if (dateHour < startHour) {
    date.setHours(startHour, 0, 0);
  } else if (dateHour >= endHour) {
    date.setDate(date.getDate() + 1);
    date.setHours(startHour, 0, 0);
  }

  if (date.getDay() == 0) {
    date.setDate(date.getDate() + 1);
    date.setHours(startHour, 0, 0);
    flag += 1;
  } else if (date.getDay() == 6) {
    date.setDate(date.getDate() + 2);
    date.setHours(startHour, 0, 0);
    flag += 1;
  }
}

function AddWorkingTime(date, workingTime) {
  const daysCount = parseInt(workingTime / dayDuration);
  const additionalworkingHours = workingTime % dayDuration;
  date.setDate(date.getDate() + daysCount);
  const hourstilldayEnd = endHour - date.getHours() - date.getMinutes() / 60;
  if (additionalworkingHours <= hourstilldayEnd) {
    date.setTime(date.getTime() + 3600000 * additionalworkingHours);
  } else {
    date.setDate(date.getDate() + 1);
    date.setHours(startHour, 0, 0);
    date.setTime(
      date.getTime() + 3600000 * (additionalworkingHours - hourstilldayEnd)
    );
  }
}

function Shift(date, flag, startDay, workingTime) {
  const daysCount = parseInt(workingTime / dayDuration);
  date.setDate(date.getDate() + 2 * parseInt(daysCount / weekDuration)); //take into account weekends
  if (
    flag == 0 &&
    (date.getDay() == 6 || date.getDay() == 0 || date.getDay() < startDay)
  ) {
    date.setDate(date.getDate() + 2);
  }
}

function GetDeadline(workingTime, currentDate) {
  let flag = 0;
  const deadline = currentDate;
  SkipNonWorkingTime(deadline, flag);
  const startDay = deadline.getDay();
  AddWorkingTime(deadline, workingTime);
  Shift(deadline, flag, startDay, workingTime);
  if (deadline.getHours() == startHour && deadline.getMinutes() == 0) {
    //if deadline goes to the morning of next day
    deadline.setDate(deadline.getDate() - 1);
    if (deadline.getDay() == 0) {
      deadline.setDate(deadline.getDate() - 2);
    }
    deadline.setHours(endHour, 0, 0);
  }
  return deadline;
}

export { GetPrice, GetDeadline, GetWorkingTime };
