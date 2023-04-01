import axios from "axios";
import { readFileSync } from "fs";
const trueFalseCount = { trues: 0, falses: 0 };
const endpoints = readFileSync("./endpoints.txt", "utf8")
  .split("\n")
  .filter((endpoint) => endpoint);

function isDoneSearch(objectToSearch) {
  const keys = Object.keys(objectToSearch);
  for (let key of keys) {
    const value = objectToSearch[key];
    if (typeof value === "object") {
      const isDone = isDoneSearch(value);
      if (isDone === true || isDone === false) return isDone;
    }
    if (key === "isDone") return value;
  }
  return undefined;
}

const getJson = (endpoint) => {
  return new Promise(async (resolve, reject) => {
    let counter = 0;
    let JSON;
    while (counter !== 3) {
      try {
        JSON = (await axios.get(endpoint)).data;
        return resolve({ endpoint: endpoint, JSON: JSON });
      } catch (err) {
        counter += 1;
      }
    }
    return resolve();
  });
};

const getJsonArray = [];
endpoints.forEach((endpoint) => getJsonArray.push(getJson(endpoint)));
const endpointsJsons = await Promise.all(getJsonArray);
endpointsJsons.forEach((endpointJson) => {
  if (!endpointJson) return;
  const { endpoint, JSON } = endpointJson;
  console.log(endpoint);
  const isDone = isDoneSearch(JSON);
  console.log(isDone);
  isDone ? (trueFalseCount.trues += 1) : (trueFalseCount.falses += 1);
});

console.log(`Trues: ${trueFalseCount.trues}`);
console.log(`Falses: ${trueFalseCount.falses}`);
