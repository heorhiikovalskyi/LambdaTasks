import { pool } from "./db";
import { Request, isRequest } from "./types/request";
import { shops } from "./shops";

exports.handler = async (event: any, context: any, callback: any) => {
  try {
    const request = JSON.parse(event.body);
    if (!isRequest(request)) {
      throw new Error("request is not valid");
    }
    const { name, secret, password, shop } = request;
    if (!shops.includes(shop)) {
      throw new Error("no such shop");
    }
    const query = `CALL insertRequest($1, $2, $3, $4);`;
    const values = [name, password, secret, shop];
    let result = await pool.query(query, values);
    console.log(result);
    return {
      statusCode: 200,
    };
  } catch (err: any) {
    callback(null, {
      body: JSON.stringify({ "Error Message:": JSON.stringify(err.message) }),
    });
  }
};
