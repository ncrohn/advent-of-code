import { readFileSync } from "node:fs";

const rawInput = readFileSync(__dirname + "/input.txt").toString();

const testInput = "467..114..\n" +
  "...*......\n" +
  "..35..633.\n" +
  "......#...\n" +
  "617*......\n" +
  ".....+.58.\n" +
  "..592.....\n" +
  "......755.\n" +
  "...$.*....\n" +
  ".664.598..";


const i = testInput;

i.split('\n').map((val, idx) => {
  val.split('').forEach((char) => Number(char))
})