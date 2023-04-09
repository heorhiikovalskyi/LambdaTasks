import { Request, Response } from "express";
import { jsonCollection } from "../models/jsons.js";
import { mongoErrorsHandler } from "./errorHandler.js";
export const sendJson = async (req: Request, res: Response) => {
  const { url: route } = req;
  try {
    const document = await jsonCollection.findOne({ route: route }, { projection: { _id: 0, JSON: 1 } });
    if (!document) {
      res.send("There is no JSON linked with this route!");
      return;
    }
    const { JSON: json } = document;
    res.status(200).json(json);
  } catch (err) {
    mongoErrorsHandler(err, res);
  }
};
