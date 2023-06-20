import { eq, sql, lte, and } from "drizzle-orm";
import { NewExchangeRate, ExchangeRate } from "../db/schema/exchangeRates.js";
import { db } from "../db.js";
import { exchangeRates } from "../db/schema/exchangeRates.js";
import { cryptocurrencies } from "../db/schema/cryptocurrencies.js";
import { CurrencyAverage, CurrenciesAverage } from "../DTO/dto.js";

export class ExchangeRatesRepo {
  private constructor() {}
  private static instance: ExchangeRatesRepo;
  public static getInstance(): ExchangeRatesRepo {
    if (!ExchangeRatesRepo.instance) {
      ExchangeRatesRepo.instance = new ExchangeRatesRepo();
    }
    return ExchangeRatesRepo.instance;
  }

  insert = async (exchanges: NewExchangeRate[]) => {
    await db.insert(exchangeRates).values(exchanges);
  };

  getMarketExchanges = async (time: number, market: number, currency: number): Promise<ExchangeRate[]> => {
    console.log(time);
    console.log(sql.raw(time.toString()));
    return await db
      .select()
      .from(exchangeRates)
      .where(
        and(
          sql`TIMESTAMPDIFF(minute,${exchangeRates.date},NOW()) <= ${time}`,
          eq(exchangeRates.market, market),
          eq(exchangeRates.cryptocurrency, currency)
        )
      );
  };

  getCurrencyAverageExchanges = async (time: number, currency: number): Promise<CurrencyAverage> => {
    return (
      await db
        .select({ "average price (USD)": sql<number | null>`AVG(conversiontoUSD)` })
        .from(exchangeRates)
        .where(
          and(
            sql`timestampdiff(minute,date,now()) <= ${sql.raw(time.toString())}`,
            eq(exchangeRates.cryptocurrency, currency)
          )
        )
    )[0];
  };

  getCurrenciesAverageExchanges = async (time: number): Promise<CurrenciesAverage[]> => {
    return await db
      .select({ "average price (USD)": sql<number | null>`AVG(conversiontoUSD)`, symbol: cryptocurrencies.symbol })
      .from(exchangeRates)
      .leftJoin(cryptocurrencies, eq(exchangeRates.cryptocurrency, cryptocurrencies.id))
      .where(sql`timestampdiff(minute,date,now()) <= ${sql.raw(time.toString())}`)
      .groupBy(({ symbol }) => symbol);
  };
}
