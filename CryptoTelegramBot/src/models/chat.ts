import { db } from "../ConnectToDB.js";
export function FindChat(id: number) {
  return new Promise(async (resolve, reject) => {
    const chat = await db
      .get(
        `SELECT id FROM Chat WHERE id = ?;`,
        [id],
        function (err: any, row: any) {
          err ? reject(err) : resolve(row);
        }
      )
      .catch((err) => reject(err));
    chat ? resolve(true) : resolve(false);
  });
}

export function InsertChat(id: number): Promise<void> {
  return new Promise(async (resolve, reject) => {
    await db
      .run(`INSERT INTO Chat(id) VALUES (?)`, [id])
      .catch((err) => reject(err));
    resolve();
  });
}
