import { db } from "../ConnectToDB.js";
export const findChat = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const row = await db.get(`SELECT id FROM Chat WHERE id = ?;`, [id]);
      resolve(row);
    } catch (err) {
      resolve(false);
    }
  });
};

export const insertChat = (id: number): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.run(`INSERT INTO Chat(id) VALUES (?)`, [id]);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
