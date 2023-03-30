import { Request, Response } from "express";
import { JSONcollection } from "../models/JSONS.js";

function ErrorHandlerIfNotJSON(
  err: any,
  req: Request,
  res: Response,
  next: any
) {
  return res.status(400).send(err.toString().slice(13));
}

function AdditionlJSONChecks(DataFromUser: any): string {
  if (Array.isArray(DataFromUser)) {
    if (!DataFromUser.length) return "An array is empty";
    for (let i = 0; i < DataFromUser.length; i++) {
      if (JSON.stringify(DataFromUser[i])[0] != "{")
        return `Check all given JSONS. There is not JSON at ${i + 1} position`;
    }
  }
  return "JSON is valid";
}

function MongoDBErrorsHandler(error: any, res: Response) {
  switch (error.code) {
    case 11000:
      return res.status(409).send("This route is not available");
    default:
      return res.sendStatus(503); //server is unavailable
  }
}

const StoreUsersJSON = async (req: Request, res: Response) => {
  const DataFromUser = req.body;
  const route = req.url;
  const additionalJSONCheck = AdditionlJSONChecks(DataFromUser); //express uses JSON.parse() that thinks [44, true] or ['sdfsdf'] is JSON. Will make additional checks.
  if (additionalJSONCheck === "JSON is valid") {
    await JSONcollection.insertOne({
      route: route,
      JSON: Array.isArray(DataFromUser) ? DataFromUser : [DataFromUser],
    }).catch((error) => {
      MongoDBErrorsHandler(error, res);
    });
    if (!res.headersSent) return res.sendStatus(200);
  } else return res.status(400).send(additionalJSONCheck);
};

export { StoreUsersJSON, ErrorHandlerIfNotJSON };
