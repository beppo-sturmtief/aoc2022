const dirStepX = dir => dir.indexOf('L') > -1 ? -1 : dir.indexOf('R') > -1 ? 1 : 0;
const dirStepY = dir => dir.indexOf('D') > -1 ? -1 : dir.indexOf('U') > -1 ? 1 : 0;
const invertedDir = dir => ({L:'R', R:'L', U:'D', D:'U'})[dir];
const applyHeadMove = ({tailCovered, tail, headRelToTail}, headDir) => {
  if (headRelToTail == 'X')
    return {tailCovered, tail, headRelToTail: headDir};
  if (headRelToTail === invertedDir(headDir))
    return {tailCovered, tail, headRelToTail: 'X'};
  if (headRelToTail.indexOf(invertedDir(headDir)) > -1)
    return {tailCovered, tail, headRelToTail: headRelToTail.replace(invertedDir(headDir),'')};
  if (headRelToTail == headDir) {
    const newTail = [tail[0] + dirStepX(headDir), tail[1] + dirStepY(headDir)];
    return {tailCovered: [...tailCovered, newTail.toString()], tail: newTail, headRelToTail}; 
  }
  if (headRelToTail.length == 1)
    return {tailCovered, tail, headRelToTail: headRelToTail + headDir};
  
  const newTail = [tail[0] + dirStepX(headRelToTail), tail[1] + dirStepY(headRelToTail)];
  return {tailCovered: [...tailCovered, newTail.toString()], tail: newTail, headRelToTail: headDir};
};

const input = (await (await fetch('https://adventofcode.com/2022/day/9/input')).text()).trim();
const steps = input.split('\n')
  .flatMap(cmd => {
    const [dir, count] = cmd.split(' '); 
    return Array(parseInt(count)).fill(dir); }
  );
const tailCovered = steps
  .reduce(applyHeadMove, {tailCovered: [[0,0].toString()], tail: [0,0], headRelToTail: 'X'})
  .tailCovered;

console.log(`Part 1: ${new Set(tailCovered).size} - Part 2: ${-1}`);
