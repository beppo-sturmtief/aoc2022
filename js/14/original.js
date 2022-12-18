const oneMove = (field, width, pos, startPos) => {
  let move = 0;
  if (field[pos +  width] == '.')
    move = width;
  else if (field[pos + width - 1] == '.')
    move = width - 1;
  else if (field[pos +  width + 1] == '.')
    move = width + 1;
  else
    move = startPos - pos;
  
  if (move > 0)
    field[pos] = '.';

  field[pos + move] = 'o';
  return pos + move;
};

const input = (await (await fetch('https://adventofcode.com/2022/day/14/input')).text()).trim();
const lines = input.split('\n').map(line => line.split(' -> ').map(pair => pair.split(',').map(i => parseInt(i))));
const maxY = lines.flatMap(l=>l).reduce((max, [x,y]) => Math.max(max,y), 0);
const width = 1001;
const height = maxY + 3;
const pos = ([x,y]) => x + width * y;

let field = Array(width * height).fill('.');

for (let line of lines) {
  for (let idx = 0; idx < line.length - 1; idx++) {
    const begin = Math.min(pos(line[idx]), pos(line[idx+1]));
    const end = Math.max(pos(line[idx]), pos(line[idx+1]));
    const step = (line[idx][0] != line[idx+1][0] ? 1 : width);
    for (let pos = begin; pos <= end; pos += step) field[pos] = '#';
  }
}

for (let pos = width * (height - 1); pos < width * height; pos++)
  field[pos] = 'X';

const startPos = pos([500,0]);

let sandPos = startPos;
field[sandPos] = 'o';
let sandCount = 1;

while (sandPos < (height-2) * width) {
  sandPos = oneMove(field, width, sandPos, startPos);
  if (sandPos == startPos)
    sandCount++;
}

const restingSandCount1 = sandCount - 1;

/// part 2
while (true) {
  const newSandPos = oneMove(field, width, sandPos, startPos);
  if (newSandPos == sandPos)
    break;
  sandPos = newSandPos;
  if (sandPos == startPos)
    sandCount++;
}

const restingSandCount2 = sandCount;
console.log(`Part 1: ${restingSandCount1} - Part 2: ${restingSandCount2}`);

// for (let row = 0; row < height; row++) console.log(field.slice(row*width, (row+1)*width).join(''));
// for (let row = 0; row < height; row++) console.log(field.slice(row*width+450, row*width+700).join(''));

