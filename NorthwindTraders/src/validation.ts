import { Request, Response } from "express";

const validatePagination = (startId: number, count: number): boolean => {
  if (Number.isInteger(startId) && Number.isInteger(count) && startId >= 0 && count > 0) {
    return true;
  }
  return false;
};

export const validateCustomers = (req: Request, res: Response, next: any) => {
  const { offset, count } = req.query;
  if (offset && count) {
    if (!validatePagination(+offset, +count)) {
      return res.sendStatus(400);
    }
  }
  next();
};

export const validateEmployees = (req: Request, res: Response, next: any) => {
  const { startId, count } = req.query;
  if (startId && count) {
    if (!validatePagination(+startId, +count)) {
      return res.sendStatus(400);
    }
  }

  const { id } = req.query;
  if (id && isNaN(+id)) {
    return res.sendStatus(400);
  }
  next();
};

export const validateOrders = (req: Request, res: Response, next: any) => {
  const { startId, count } = req.query;
  if (startId && count) {
    if (!validatePagination(+startId, +count)) {
      return res.sendStatus(400);
    }
  }
  next();
};

export const validateProducts = (req: Request, res: Response, next: any) => {
  const { startId, count } = req.query;
  if (startId && count) {
    if (!validatePagination(+startId, +count)) {
      return res.sendStatus(400);
    }
  }
  next();
};

export const validateSuppliers = (req: Request, res: Response, next: any) => {
  const { startId, count } = req.query;
  if (startId && count) {
    if (!validatePagination(+startId, +count)) {
      return res.sendStatus(400);
    }
  }

  const { id } = req.query;
  if (id && isNaN(+id)) {
    return res.sendStatus(400);
  }
  next();
};
