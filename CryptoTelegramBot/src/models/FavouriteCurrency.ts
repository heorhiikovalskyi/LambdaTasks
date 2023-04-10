import { db } from "../ConnectToDB.js";

export function DeleteFavCur(chat: number, currency: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    await db
      .run(
        `DELETE FROM FavouriteCurrency WHERE chat = ? AND currency = (SELECT id FROM Cryptocurrency WHERE symbol = ?)`,
        [chat, currency]
      )
      .catch((err) => reject(err));
    resolve();
  });
}

export function GetUserFavourites(chat: number): Promise<Array<{ symbol: string }> | void> {
  return new Promise(async (resolve, reject) => {
    const currencies = await db
      .all(
        `SELECT symbol FROM FavouriteCurrency LEFT JOIN Cryptocurrency ON FavouriteCurrency.currency = Cryptocurrency.id WHERE chat = ?`,
        [chat]
      )
      .catch((err) => reject(err));
    resolve(currencies);
  });
}

export function InsertFavCurrency(chat: number, currency: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    await db
      .run(
        `INSERT INTO FavouriteCurrency(chat, currency) VALUES 
        (?, (SELECT id FROM Cryptocurrency WHERE symbol = ?))`,
        [chat, currency]
      )
      .catch((err) => reject(err));
    resolve();
  });
}
