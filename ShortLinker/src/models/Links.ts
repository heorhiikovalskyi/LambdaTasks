import { connectionsPool } from "../mysql.js";
import { links } from "../types.js";
export function CountLinks(): Promise<number> {
  return new Promise((resolve, reject) => {
    connectionsPool.getConnection(function (err, connection) {
      if (err) reject(err);
      connection.execute(
        "SELECT COUNT(*) FROM links",
        [],
        function (err, results) {
          connection.release();
          const linksCount = results[0]["COUNT(*)"];
          return err ? reject(err) : resolve(linksCount);
        }
      );
    });
  });
}
export function InsertLinks(links: links): Promise<void> {
  return new Promise((resolve, reject) => {
    connectionsPool.getConnection(function (err, connection) {
      if (err) reject(err);
      connection.execute(
        "INSERT INTO links(fulllink, shortlink, counter) VALUES (?, ?, ?)",
        [links.fullLink, links.shortLink, links.counter],
        function (err, results) {
          connection.release();
          return err ? reject(err) : resolve();
        }
      );
    });
  });
}
export function FindByShortLink(shortLink: string): Promise<links> {
  return new Promise((resolve, reject) => {
    connectionsPool.getConnection(function (err, connection) {
      if (err) reject(err);
      connection.execute(
        "SELECT * FROM links where shortlink = ?",
        [shortLink],
        function (err, results) {
          connection.release();
          if (err) return reject(err);
          if (results.length === 0) return reject("Empty");
          const links = results[0];
          resolve({
            fullLink: links["fullLink"],
            shortLink: links["shortLink"],
            counter: links["counter"],
          });
        }
      );
    });
  });
}
export function FindByFullLink(fullLink: string): Promise<links> {
  return new Promise((resolve, reject) => {
    connectionsPool.getConnection(function (err, connection) {
      if (err) reject(err);
      connection.execute(
        "SELECT * FROM links where fulllink = ?",
        [fullLink],
        function (err, results) {
          connection.release();
          if (err) return reject(err);
          if (results.length === 0) return reject("Empty");
          const links = results[0];
          resolve({
            fullLink: links["fullLink"],
            shortLink: links["shortLink"],
            counter: links["counter"],
          });
        }
      );
    });
  });
}
export function FindLastLinks(): Promise<links> {
  return new Promise((resolve, reject) => {
    connectionsPool.getConnection(function (err, connection) {
      if (err) reject(err);
      connection.execute(
        "SELECT * FROM links ORDER BY counter DESC LIMIT 1;",
        [],
        function (err, results) {
          connection.release();
          const links = results[0];
          return err
            ? reject(err)
            : resolve({
                fullLink: links["fullLink"],
                shortLink: links["shortLink"],
                counter: links["counter"],
              });
        }
      );
    });
  });
}
