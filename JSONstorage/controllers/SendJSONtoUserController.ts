import { Request, Response } from "express";
import { JSONcollection } from "../models/JSONS.js";

async function SendJSON(req: Request, res: Response) {
  const route = req.url;
  const JSON = await JSONcollection.findOne(
    { route: route },
    { projection: { _id: 0, JSON: 1 } }
  );
  if (JSON == null) return res.send("There is no JSON linked with this route!");
  else return res.status(200).json(JSON.JSON);
}

export { SendJSON };
