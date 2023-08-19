import http from "k6/http";
import { shops } from "../dist/shops.js";
const url = "https://0lsa32rc3e.execute-api.eu-central-1.amazonaws.com/dev/send";

export const options = {
  vus: 100,
  duration: "5s",
};

function getRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function getRandomShop(extraShop) {
  const sample = [...shops];
  sample.push(extraShop);
  return sample[Math.floor(Math.random() * sample.length)];
}

function randomRequest() {
  const stringLen = 8;
  const extraShop = 6;
  const request = {
    name: getRandomString(stringLen),
    password: getRandomString(stringLen),
    secret: getRandomString(stringLen),
    shop: getRandomShop(extraShop),
  };
  return request;
}

export default function () {
  const request = randomRequest();
  const payload = JSON.stringify(request);
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = http.post(url, payload, params);
  console.log(response);
}
