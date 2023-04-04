import inputJSON from "./vacations.json" assert { type: "json" };
const resultJSON = [];
class Worker {
  id;
  name;
  weekends;
  constructor(id, name, weekend) {
    this.id = id;
    this.name = name;
    this.weekends = [weekend];
  }
  addWeekend(weekend) {
    this.weekends.push(weekend);
  }
}

const findName = (name) => {
  for (let i = 0; i < resultJSON.length; i++) {
    const { name: workerName } = resultJSON[i];
    if (workerName === name) return i;
  }
  return false;
};

inputJSON.forEach((record) => {
  const { name, _id: id } = record.user;
  const weekend = { startDate: record.startDate, endDate: record.endDate };
  if (!findName(name)) {
    resultJSON.push(new Worker(id, name, weekend));
  } else {
    resultJSON[findName(name)].addWeekend(weekend);
  }
});

console.log(JSON.stringify(resultJSON, null, 2));
