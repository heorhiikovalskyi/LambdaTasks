import { Request, Response } from "express";
import { markets } from "./types/enums/marketsEnum.js";
import { UserQuery } from "./types/interfaces/userQuery.js";
import { error } from "./types/interfaces/errors.js";
import { currencies } from "./types/enums/currenciesEnum.js";
export const validateRequest = (req: Request, res: Response, next: any) => {
  function validate(): error | null {
    const { query: userQuery } = req;
    if (!isUserQuery(userQuery)) {
      const error = {
        message: "Need time period: time=45m",
        code: 400,
      };
      return error;
    }
    const validationResult = validateUserInput(userQuery);
    if (validationResult !== "all right") {
      return validationResult as error;
    }
    return null;
  }

  const err = validate();
  if (err) {
    if (err.code === 400) {
      const { code, message } = err;
      return res.status(code).send(message);
    }
    console.log(err);
    return res.sendStatus(500);
  }
  next();
};

const validateUserInput = (userQuery: UserQuery): string | error => {
  const { currency, time } = userQuery;
  if (currency && !currencies.includes(currency)) {
    return {
      message: "No such currency",
      code: 400,
    };
  }

  if (!/^\d+(h|m)/.test(time)) {
    return {
      message: "No such time period. Try 45m or 2h for example",
      code: 400,
    };
  }

  let { market } = userQuery;
  market = market ? market.toLowerCase() : market;

  if (market && !markets.includes(market)) {
    return { message: "No such market", code: 400 };
  }

  if (market && !currency) {
    return { message: "Need currency: currency=BTC", code: 400 };
  }

  return "all right";
};

function isUserQuery(object: unknown): object is UserQuery {
  if (object !== null && typeof object === "object") {
    return "time" in object!;
  }
  return false;
}
