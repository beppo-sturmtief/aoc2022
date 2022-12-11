// Utils
const dirStep = [
  dir => dir.indexOf('L') > -1 ? -1 : dir.indexOf('R') > -1 ? 1 : 0,
  dir => dir.indexOf('D') > -1 ? -1 : dir.indexOf('U') > -1 ? 1 : 0
];
const nextPosition = (pos, dir) => pos.split('x').map((coord, i) => parseInt(coord) + dirStep[i](dir)).join('x');

const invertedDir = dir => ({L:'R', R:'L', U:'D', D:'U', LD:'RU', RD:'LU', LU:'RD', RU:'LD'})[dir];

const followLeadMove = ({moves, dirToLead}, dir) => {
  if (dirToLead == 'X')
    return {moves, dirToLead: dir};
  if (dirToLead == dir)
    return {moves: [...moves, dir], dirToLead};
  if (dirToLead === invertedDir(dir))
    return {moves, dirToLead: 'X'};
  if (dir.indexOf(dirToLead) > -1)
    return {moves: [...moves, dir], dirToLead};
  if (dirToLead.indexOf(dir) > -1)
    return {moves: [...moves, dirToLead], dirToLead: dir};
  if (dir.indexOf(invertedDir(dirToLead)) > -1)
    return {moves, dirToLead: dir.replace(invertedDir(dirToLead),'')};
  if (dirToLead.indexOf(invertedDir(dir)) > -1)
    return {moves, dirToLead: dirToLead.replace(invertedDir(dir), '')};
  if ((dir.length == 1) && (dirToLead.length == 1))
    return {moves, dirToLead: (dir == 'L' || dir == 'R' ? dir+dirToLead : dirToLead+dir)};
  if (dir[0] == dirToLead[0])
    return {moves: [...moves, dir[0]], dirToLead: dir[0]};
  if (dir[1] == dirToLead[1])
    return {moves: [...moves, dir[1]], dirToLead: dir[1]};
  // this should never happen - otherwise its a bug
  console.log("Error - case not handled: ", dirToLead, dir);
  return null;
};

// Read/prepare input
const input = (await (await fetch('https://adventofcode.com/2022/day/9/input')).text()).trim();
const headMoves = input.split('\n')
  .flatMap(cmd => {
    const [dir, count] = cmd.split(' '); 
    return Array(parseInt(count)).fill(dir); }
  );

// part 1 - tail immediately follows head
const part1TailMoves = headMoves
  .reduce(followLeadMove, {moves:[], dirToLead: 'X'})
  .moves;
const part1TailCovered = part1TailMoves
  .reduce((pos, dir) => [...pos, nextPosition(pos[pos.length-1], dir)], ['0x0']);

// part 2 - 1 follows head, 2 follows 1, ..., 9 (==tail) follows 8
const part2TailMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  .reduce((moves, _) => moves
        .reduce(followLeadMove, {moves:[], dirToLead: 'X'}).moves
  , headMoves);
const part2TailCovered = part2TailMoves
  .reduce((pos, dir) => [...pos, nextPosition(pos[pos.length-1], dir)], ['0x0']);

// output result
console.log(`Part 1: ${new Set(part1TailCovered).size} - Part 2: ${new Set(part2TailCovered).size}`);
