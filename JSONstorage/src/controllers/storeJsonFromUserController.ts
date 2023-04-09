import { Request, Response } from "express";
import { jsonCollection } from "../models/jsons.js";
import { mongoErrorsHandler } from "./errorHandler.js";
const additionalJsonChecks = (userData: any): string => {
  if (Array.isArray(userData)) {
    const { length } = userData;
    if (!length) {
      return "An array is empty";
    }
    for (let i = 0; i < length; i++) {
      const convertToJson = JSON.stringify(userData[i]);
      if (convertToJson[0] !== "{") {
        return `Check all given JSONS. There is not JSON at ${i + 1} position`;
      }
    }
  }
  return "JSON is valid";
};

export const storeUsersJson = async (req: Request, res: Response) => {
  let { body: dataToStore, url: route } = req;
  const additionalJsonCheck = additionalJsonChecks(dataToStore);
  if (additionalJsonCheck === "JSON is valid") {
    try {
      dataToStore = Array.isArray(dataToStore) ? dataToStore : [dataToStore];
      await jsonCollection.insertOne({
        route: route,
        JSON: dataToStore,
      });
    } catch (error) {
      mongoErrorsHandler(error, res);
      return;
    }
    res.sendStatus(200);
  } else {
    res.status(400).send(additionalJsonCheck);
  }
};
