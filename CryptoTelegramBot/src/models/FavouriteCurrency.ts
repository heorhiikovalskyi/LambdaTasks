import { db } from "../ConnectToDB.js";

export const deleteFavCur = (chat: number, currency: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.run(
        `DELETE FROM FavouriteCurrency WHERE chat = ? AND currency = (SELECT id FROM Cryptocurrency WHERE symbol = ?)`,
        [chat, currency]
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
export const getUserFavourites = (chat: number): Promise<Array<{ symbol: string }>> => {
  return new Promise(async (resolve, reject) => {
    try {
      const currencies = await db.all(
        `SELECT symbol FROM FavouriteCurrency LEFT JOIN Cryptocurrency ON FavouriteCurrency.currency = Cryptocurrency.id WHERE chat = ?`,
        [chat]
      );
      resolve(currencies);
    } catch (err) {
      reject(err);
    }
  });
};

export const insertFavCurrency = (chat: number, currency: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.run(
        `INSERT INTO FavouriteCurrency(chat, currency) VALUES 
        (?, (SELECT id FROM Cryptocurrency WHERE symbol = ?))`,
        [chat, currency]
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
