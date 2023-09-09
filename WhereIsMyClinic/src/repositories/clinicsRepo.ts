import { gte, eq, like, sql } from "drizzle-orm";
import { Clinics, Clinic } from "../db/schema/clinics.js";
import { db } from "../db/db.js";

export class ClinicsRepo {
  private constructor() {}
  private static instance: ClinicsRepo;
  public static getInstance(): ClinicsRepo {
    if (!ClinicsRepo.instance) {
      ClinicsRepo.instance = new ClinicsRepo();
    }
    return ClinicsRepo.instance;
  }

  getByCity = async (city: string): Promise<Clinic[]> => {
    return await db.select().from(Clinics).where(eq(Clinics.city, city));
  };

  getByState = async (state: string): Promise<Clinic[]> => {
    return await db.select().from(Clinics).where(eq(Clinics.state, state));
  };

  getByZip = async (zip: string): Promise<Clinic[]> => {
    return await db.select().from(Clinics).where(eq(Clinics.postCode, zip));
  };

  getByName = async (clinic: string): Promise<Clinic[]> => {
    return await db.select().from(Clinics).where(eq(Clinics.name, clinic));
  };

  getBySuburb = async (suburb: string): Promise<Clinic[]> => {
    return await db.select().from(Clinics).where(eq(Clinics.suburbName, suburb));
  };
}
