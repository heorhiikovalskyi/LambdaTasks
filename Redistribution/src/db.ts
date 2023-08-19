import { Pool } from "pg";

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export const pool = new Pool({
  user: DB_USERNAME,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT!),
  ssl: true,
});

const createTables = async () => {
  try {
    await pool.query(`CREATE TABLE requests (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(8) NOT NULL,
    secret VARCHAR(255) NOT NULL,
    shop INT NOT NULL,
    CONSTRAINT uniqieCredits UNIQUE (name, password)
);`);
    await pool.query(
      `CREATE TABLE countRequests (id SERIAL PRIMARY KEY NOT NULL, shop INT NOT NULL, counter INT NOT NULL);`
    );
    await pool.query(`INSERT INTO countRequests (shop, counter)  
    VALUES (1, 0), (2, 0), (3, 0), (4, 0), (5, 0);`);
    await pool.query(`CREATE OR REPLACE PROCEDURE insertRequest(
      p_name VARCHAR(255),
      p_password VARCHAR(8),
      p_secret VARCHAR(255),
      p_shop INT
  )
  AS $$
  DECLARE
      shopCount INT;
  BEGIN
      SELECT counter INTO shopCount
      FROM countRequests
      WHERE shop = p_shop;
      IF shopCount < 10000 THEN
          UPDATE countRequests
          SET counter = counter + 1
          WHERE shop = p_shop;
          INSERT INTO requests (name, password, secret, shop) VALUES (p_name, p_password, p_secret, p_shop);
      ELSE
          RAISE EXCEPTION 'Shop count limit exceeded (10,000)';
      END IF;
  END;
  $$ LANGUAGE plpgsql;`);
  } catch (err) {
    console.log(err);
  }
};
