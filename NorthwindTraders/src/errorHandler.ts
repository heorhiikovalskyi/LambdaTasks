import { Request, Response } from "express";

export const errorHandler = async (err: any, res: Response) => {
  console.log(err);
  return res.sendStatus(500);
};
