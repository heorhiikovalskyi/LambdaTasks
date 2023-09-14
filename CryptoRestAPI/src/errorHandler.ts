import { Request, Response } from "express";
export const errorHandler = async (err: any, req: Request, res: Response, next: any) => {
  if (err.code === 400) {
    const { code, message } = err;
    return res.status(code).send(message);
  }
  console.log(err);
  return res.sendStatus(500);
};
