import { readFileSync } from "node:fs";

const rawInput = readFileSync(__dirname + "/input.txt").toString();

const DIGIT_MAP = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const findTextDigit = (val: string): string[] => {
  let matches: string[] = [];
  DIGIT_MAP.forEach((digit) => {
    const reg = new RegExp(`${digit}`, "ig");
    const m = [...val.matchAll(reg)];
    if (m) {
      matches = [...matches, ...m].flatMap((v) => v);
    }
  });

  return matches;
};

const findFirstDigit = (val: string): number => {
  const matches = findTextDigit(val);

  if (matches?.length) {
    const digit = matches.reduce((prev, curr) => {
      if (val.indexOf(prev) > val.indexOf(curr)) {
        return curr;
      }

      return prev;
    });

    val = val.replaceAll(digit, String(DIGIT_MAP.indexOf(digit) + 1));
  }

  const rawNumbers = val.match(/(\d+)/gi);

  if (!rawNumbers) {
    return 0;
  }

  const numbers = rawNumbers.join("").split("").map(Number);

  return numbers[0];
};

const findLastDigit = (val: string): number => {
  const matches = findTextDigit(val);

  if (matches?.length) {
    const digit = matches.reduce((prev, curr) => {
      if (val.lastIndexOf(prev) < val.lastIndexOf(curr)) {
        return curr;
      }

      return prev;
    });

    val = val.replaceAll(digit, String(DIGIT_MAP.indexOf(digit) + 1));
  }

  const rawNumbers = val.match(/(\d+)/gi);

  if (!rawNumbers) {
    return 0;
  }

  const numbers = rawNumbers.join("").split("").map(Number);

  return numbers[numbers.length - 1];
};

console.log(
  rawInput
    .split("\n")
    .map((line, idx) => {
      const firstDigit = findFirstDigit(line);
      const lastDigit = findLastDigit(line);

      return Number(`${firstDigit}${lastDigit}`);
    })
    .reduce((prev, curr) => {
      return prev + curr;
    }),
);
