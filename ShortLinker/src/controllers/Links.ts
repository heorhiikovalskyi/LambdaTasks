import { Request, Response } from "express";
import "dotenv/config.js";
import { InsertLinks, FindLastLinks, FindByShortLink, FindByFullLink } from "../models/Links.js";
import { links } from "../types.js";
let counter = (await FindLastLinks()).counter;
export async function ErrorHandler(err: any, req: Request, res: Response, next: any) {
  if (err.code === 400) return res.status(err.code).send(err.message);
  console.log(err);
  return res.sendStatus(500);
}
function toBase62(number: number): string {
  const baseChars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  do {
    result = baseChars[number % 62] + result;
    number = Math.floor(number / 62);
  } while (number > 0);
  return result;
}
export async function RedirectUser(req: Request, res: Response, next: any) {
  const shortLink = req.path.substring(1);
  let links;
  try {
    links = await FindByShortLink(shortLink);
  } catch (err: any) {
    if (err === "Empty") return next({ code: 400, message: "No such path" });
    return next(err);
  }
  return res.redirect(links.fullLink);
}
function validateURL(link: string): boolean {
  try {
    new URL(link);
  } catch (err) {
    return false;
  }
  return true;
}
export async function StoreFullLink(req: Request, res: Response, next: any) {
  const fullLink: string = req.body.link;
  if (!validateURL(fullLink)) return next({ code: 400, message: "Invalid URL" });
  counter += 1;
  let shortLink = toBase62(counter);
  const links: links = {
    fullLink: fullLink,
    shortLink: shortLink,
    counter: counter,
  };
  try {
    await InsertLinks(links);
  } catch (err: any) {
    if (err.errno != 1062)
      //error isn`t because of dublicating of link
      return next(err);
    try {
      shortLink = (await FindByFullLink(fullLink)).shortLink;
    } catch (err) {
      return next(err);
    }
  }
  return res.status(200).json({ shortLink: process.env.domain + shortLink });
}
