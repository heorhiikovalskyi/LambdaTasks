import { GetPrice, GetDeadline, GetWorkingTime } from "./index.js";
import { Language } from "./classes.js";

const Ukrainian = new Language(0.05, 50, 1333);
const English = new Language(0.12, 120, 333);
const Russian = new Language(0.05, 50, 1333);

describe.each([
  { language: Ukrainian, symbolsCount: 1, extension: "doc", expected: 50 },
  { language: Ukrainian, symbolsCount: 5000, extension: "rtf", expected: 250 },
  { language: Ukrainian, symbolsCount: 5000, extension: "pdf", expected: 300 },
  { language: Russian, symbolsCount: 3000, extension: "docx", expected: 150 },
  { language: English, symbolsCount: 1, extension: "doc", expected: 120 },
  { language: English, symbolsCount: 10000, extension: "pdf", expected: 1440 },
])(
  ".GetPrice($language, $symbolsCount, $extension)",
  ({ language, symbolsCount, extension, expected }) => {
    test(`returns ${expected}`, () => {
      expect(GetPrice(language, symbolsCount, extension)).toBe(expected);
    });
  }
);

describe.each([
  { language: Ukrainian, symbolsCount: 1, extension: "doc", expected: 1 },
  { language: Ukrainian, symbolsCount: 3999, extension: "rtf", expected: 3.5 },
  { language: Ukrainian, symbolsCount: 3999, extension: "pdf", expected: 4.2 },
  { language: Russian, symbolsCount: 3999, extension: "docx", expected: 3.5 },
  { language: English, symbolsCount: 1, extension: "doc", expected: 1 },
  { language: English, symbolsCount: 3330, extension: "pdf", expected: 12.6 },
])(
  ".GetWorkingTime($language, $symbolsCount, $extension)",
  ({ language, symbolsCount, extension, expected }) => {
    test(`returns ${expected}`, () => {
      expect(GetWorkingTime(language, symbolsCount, extension)).toBe(expected);
    });
  }
);

describe.each([
  {
    workingTime: 1,
    currentDate: new Date("Decembry 20, 2022 11:00:00"),
    expected: new Date("Decembry 20, 2022 12:00:00"),
  },
  {
    workingTime: 8,
    currentDate: new Date("Decembry 20, 2022 11:00:00"),
    expected: new Date("Decembry 20, 2022 19:00:00"),
  },
  {
    workingTime: 16,
    currentDate: new Date("Decembry 20, 2022 11:00:00"),
    expected: new Date("Decembry 21, 2022 18:00:00"),
  },
  {
    workingTime: 100,
    currentDate: new Date("Decembry 24, 2022 11:00:00"),
    expected: new Date("January 10, 2023 11:00:00"),
  },
  {
    workingTime: 9,
    currentDate: new Date("Decembry 23, 2022 19:00:00"),
    expected: new Date("Decembry 26, 2022 19:00:00"),
  },
])(
  ".GetDeadline($workingTime, $currentDate)",
  ({ workingTime, currentDate, expected }) => {
    test(`returns ${expected}`, () => {
      expect(GetDeadline(workingTime, currentDate)).toStrictEqual(expected);
    });
  }
);
