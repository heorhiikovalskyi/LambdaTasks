import csv from "csvtojson";
import { Clinics } from "./types";

const basePath = `./src/parseData/rawData`;
const csvConverter = csv({
  ignoreEmpty: true,
});

export const parseClinics = () => (<unknown>csvConverter.fromFile(`${basePath}/clinics.csv`)) as Promise<Clinics>;
