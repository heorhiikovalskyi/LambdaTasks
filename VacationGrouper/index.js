import inputJSON from "./vacations.json" assert { type: "json" };
const resultJSON = [];
class worker {
  _id;
  name;
  weekends;
  constructor(id, name, weekend) {
    this._id = id;
    this.name = name;
    this.weekends = [weekend];
  }
  AddWeekend(weekend) {
    this.weekends.push(weekend);
  }
}

function FindName(name) {
  for (let i = 0; i < resultJSON.length; i++) {
    if (resultJSON[i].name === name) return i;
  }
  return false;
}

for (let i = 0; i < inputJSON.length; i++) {
  const name = inputJSON[i]["user"]["name"];
  const id = inputJSON[i]["user"]["_id"];
  const weekend = {
    startDate: inputJSON[i]["startDate"],
    endDate: inputJSON[i]["endDate"],
  };
  if (FindName(name) === false) resultJSON.push(new worker(id, name, weekend));
  else resultJSON[FindName(name)].AddWeekend(weekend);
}
console.log(JSON.stringify(resultJSON, null, 2));
