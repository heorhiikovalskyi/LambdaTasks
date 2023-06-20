import { db } from "./db.js";
import { eq, sql, lte } from "drizzle-orm";
import { NewExchangeRate, ExchangeRate } from "./db/schema/exchangeRates.js";
import { exchangeRates } from "./db/schema/exchangeRates.js";
import { cryptocurrencies } from "./db/schema/cryptocurrencies.js";
import { CurrencyAverage, CurrenciesAverage } from "./DTO/dto.js";
import { Currencies } from "./types/enums/currenciesEnum.js";
import { and } from "drizzle-orm";
const time = 45;
const market = 1;
const currency = 17956;
const query = db
  .select()
  .from(exchangeRates)
  .where(
    and(
      sql`TIMESTAMPDIFF(minute,${exchangeRates.date},NOW()) <= ${time}`,
      eq(exchangeRates.market, market),
      eq(exchangeRates.cryptocurrency, currency)
    )
  )
  .toSQL();
console.log(query);
