import { readFileSync } from "node:fs";

const rawInput = readFileSync(__dirname + "/input.txt").toString();

const testInput =
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";

const POSSIBLE_GAME = { red: 12, green: 13, blue: 14 };

type Cube = [color: string, count: number];
type Draws = Cube[];
type Game = { id: string; draws: Draws[] };

const games = rawInput.split("\n").map((line): Game => {
  const [, id, g] = /^Game (\d+): (.+)/gi.exec(line);

  const draws = g.split(";").map((d): Draws => {
    return d
      .split(",")
      .map((x) => x.trim())
      .map((cube): Cube => {
        const [, count, color] = /^(\d+) (.+)/gi.exec(cube);
        return [color, Number(count)];
      });
  });

  return {
    id,
    draws,
  };
});

const getMinSetForGame = (game: Game) => {
  const minSet = { red: 0, green: 0, blue: 0 };

  for (let draw of game.draws) {
    for (let [color, count] of draw) {
      if (Object.hasOwn(minSet, color)) {
        if (minSet[color] < count) minSet[color] = count;
      }
    }
  }

  return minSet;
};

console.log(
  games
    .map(getMinSetForGame)
    .map((set) => set.red * set.green * set.blue)
    .reduce((a, b) => a + b),
);
