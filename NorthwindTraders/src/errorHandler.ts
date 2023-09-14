import { Request, Response } from "express";

export const errorHandler = async (err: any, req: Request, res: Response, next: any) => {
  console.log(err);
  return res.sendStatus(500);
};
