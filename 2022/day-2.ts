
import { readFileSync} from 'node:fs';

const rawInput = readFileSync(__dirname+'/day-2-input.txt').toString();

enum OppMoves {
  rock = 'A',
  paper = 'B',
  scissors = 'C',
}

enum MyMoves {
  rock = 'X',
  paper = 'Y',
  scissors = 'Z',
}

type Play = [MyMoves, OppMoves];

const WINS: Play[] = [
  [MyMoves.paper, OppMoves.rock],
  [MyMoves.rock, OppMoves.scissors],
  [MyMoves.scissors, OppMoves.paper]
]

const SCORES = {
  [MyMoves.rock]: 1,
  [MyMoves.paper]: 2,
  [MyMoves.scissors]: 3,
  lose: 0,
  draw: 3,
  win: 6
}

const convertInput = (val: string): Play | null => {
  const [o, m] = val.trim().split(' ');

  let p = [];

  if(MyMoves.rock == m) p.push(MyMoves.rock);
  if(MyMoves.paper == m) p.push(MyMoves.paper);
  if(MyMoves.scissors == m) p.push(MyMoves.scissors);

  if(OppMoves.rock === o) p.push(OppMoves.rock);
  if(OppMoves.paper === o) p.push(OppMoves.paper);
  if(OppMoves.scissors === o) p.push(OppMoves.scissors);

  if(p.length === 2) {
    return p as Play;
  }

  return null;
}

const translateMove = (move: OppMoves | MyMoves) => {
  switch(move) {
    case MyMoves.paper: return OppMoves.paper
    case MyMoves.rock: return OppMoves.rock
    case MyMoves.scissors: return OppMoves.scissors
    case OppMoves.paper: return MyMoves.paper
    case OppMoves.rock: return MyMoves.rock
    case OppMoves.scissors: return MyMoves.scissors
  }

};

const getScore = (play: Play) => {
  const [my, opp] = play;
  let score = SCORES[my];

  if(my === translateMove(opp)) {
    return SCORES.draw + score;
  }

  for(const winPlay of WINS) {
    if(my === winPlay[0] && opp === winPlay[1]) {
      return SCORES.win + score;
    }
  }

  return SCORES.lose + score;
}

const input: Play[] = rawInput.split('\n').map(convertInput).filter((x) => x !== null) as Play[];

console.log(input.map(getScore).reduce((a, b) => a+b));
