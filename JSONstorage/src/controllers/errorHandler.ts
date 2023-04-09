import { Request, Response } from "express";
export const errorHandlerIfNotJson = (err: any, req: Request, res: Response, next: any) => {
  if (err instanceof SyntaxError) {
    const message = err.toString().slice(13);
    res.status(400).send(message);
  }
};
export const mongoErrorsHandler = (err: any, res: Response) => {
  if (err.name === "MongoServerError") {
    const { code } = err;
    switch (code) {
      case 11000:
        res.status(409).send("This route is not available");
        break;
      default:
        res.sendStatus(500);
    }
  }
};
