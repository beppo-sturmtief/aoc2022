const input = (await (await fetch('https://adventofcode.com/2022/day/14/input')).text()).trim();
const lines = input.split('\n').map(line => line.split(' -> ').map(pair => pair.split(',').map(i => parseInt(i))));
const bounds = lines.flatMap(x => x).reduce(([minX,maxX, minY, maxY], pair) => 
                                            [Math.min(minX, pair[0]), Math.max(maxX, pair[0]),
                                             Math.min(minY, pair[1]), Math.max(maxY, pair[1])], 
                                            [Infinity, -Infinity, 0, -Infinity]);
const width = bounds[1] - bounds[0] + 1 + 2;
const height = bounds[3] - bounds[2] + 1 + 1;
const pos = ([x,y]) => x + width * y;
const origPos = ([x,y]) => (x - bounds[0] + 1) + width * (y - bounds[2]);

let field = Array(width * height).fill('.');

for (let line of lines) {
  for (let idx = 0; idx < line.length - 1; idx++) {
    const begin = Math.min(origPos(line[idx]), origPos(line[idx+1]));
    const end = Math.max(origPos(line[idx]), origPos(line[idx+1]));
    const step = (line[idx][0] != line[idx+1][0] ? 1 : width);
    for (let pos = begin; pos <= end; pos += step) field[pos] = '#';
  }
}

const startPos = origPos([500,0]);

let sandPos = startPos;
field[sandPos] = 'o';
let sandCount = 1;

while (sandPos < (height-1) * width) {
  
  let move = 0;
  if (field[sandPos +  width] == '.')
    move = width;
  else if (field[sandPos + width - 1] == '.')
    move = width - 1;
  else if (field[sandPos +  width + 1] == '.')
    move = width + 1;
  else if (sandPos != startPos) {
    move = startPos - sandPos;
    sandCount++;
  } else {
    console.log('completely filled...');
    break;
  }
  if (move > 0)
    field[sandPos] = '.';
  sandPos += move;
  field[sandPos] = 'o';
}

const restingSandCount = sandCount -1;

/// part 2
field = field.concat(Array(width).fill('X'));

while (sandPos < height * width) {
  let move = 0;
  if (field[sandPos +  width] == '.')
    move = width;
  else if (field[sandPos + width - 1] == '.')
    move = width - 1;
  else if (field[sandPos +  width + 1] == '.')
    move = width + 1;
  else if (sandPos != startPos) {
    move = startPos - sandPos;
    sandCount++;
  } else {
    console.log('completely filled...');
    break;
  }
  if (move > 0)
    field[sandPos] = '.';
  sandPos += move;
  field[sandPos] = 'o';
}

const restingSandCount2 = sandCount;
console.log(`Part 1: ${restingSandCount} - Part 2: ${restingSandCount2}`);
