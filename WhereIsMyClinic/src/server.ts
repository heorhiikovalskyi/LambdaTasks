import express from "express";
import "dotenv/config.js";
import { schema } from "./graphQL/schema.js";
import { graphqlHTTP } from "express-graphql";
import { fillDb } from "./db/createDb/fillDb.js";

await fillDb();

interface MyError extends Error {
  thrownValue?: { message: string; code: number };
}

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (err) => {
      const originalError = err.originalError as MyError | undefined;
      return {
        message: originalError?.thrownValue?.message || err.message,
        code: originalError?.thrownValue?.code || 400,
      };
    },
  })
);

app.listen(PORT);
