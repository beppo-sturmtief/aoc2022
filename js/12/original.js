// input
const input = (await (await fetch('https://adventofcode.com/2022/day/12/input')).text()).trim();
const originalMap = input
  .split('\n')
  .map(line=>line
       .split('')
       .map(char=>char.charCodeAt(0)
   ));
const width = originalMap[0].length;
const height = originalMap.length;
let map = originalMap.flatMap(r=>r);

const startCode = 'S'.charCodeAt(0);
const startIdx = map.indexOf(startCode);
map[startIdx] = 'a'.charCodeAt(0);

const targetCode = 'E'.charCodeAt(0);
const targetIdx = map.indexOf(targetCode);
map[targetIdx] = 'z'.charCodeAt(0);

// Part 1
let shortestWayTo = {};
let candidates = [{pos: startIdx, elevation: map[startIdx], distance: 0, predecessor: -1}];

while (candidates.length > 0 && !shortestWayTo[targetIdx]) {
  const current = candidates.shift();

  let neighbours = [current.pos - width, current.pos - 1, current.pos + 1, current.pos + width]
    .filter(p => p>=0 && p<map.length)
    .filter(p => map[p] - current.elevation < 2)
    .filter(p => !shortestWayTo[p]);
  
  let insertIdx = candidates.length;
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[i];
    if (i < insertIdx && candidate.distance > current.distance + 1)
      insertIdx = i;
    const neighbourIdx = neighbours.indexOf(candidate.pos);
    
    if (neighbourIdx > -1) {
      
      if (candidate.distance < current.distance + 1)
        neighbours.splice(neighbourIdx, 1);
      else {
        candidates.splice(i, 1);
        i--;
      }
    }
  }
  
  if (neighbours.length > 0)
    candidates.splice(insertIdx, 0, 
                    ...neighbours.map(n => ({pos: n, elevation: map[n], distance: current.distance + 1, predecessor: current.pos})));
  shortestWayTo[current.pos] = current;
  console.log('Part 1: ', Object.keys(shortestWayTo).length);
}

// part 2
let shortestWayToTargetFrom = {};
let candidatesPart2 = [{pos: targetIdx, elevation: map[targetIdx], distance: 0, predecessor: -1}];

while (candidatesPart2.length > 0) {
  const current = candidatesPart2.shift();

  let neighbours = [current.pos - width, current.pos - 1, current.pos + 1, current.pos + width]
    .filter(p => p>=0 && p<map.length)
    .filter(p => current.elevation - map[p] < 2)
    .filter(p => !shortestWayToTargetFrom[p]);
  
  let insertIdx = candidatesPart2.length;
  for (let i = 0; i < candidatesPart2.length; i++) {
    const candidate = candidatesPart2[i];
    if (i < insertIdx && candidate.distance > current.distance + 1)
      insertIdx = i;
    const neighbourIdx = neighbours.indexOf(candidate.pos);
    
    if (neighbourIdx > -1) {
      
      if (candidate.distance < current.distance + 1)
        neighbours.splice(neighbourIdx, 1);
      else {
        candidatesPart2.splice(i, 1);
        i--;
      }
    }
  }
  
  if (neighbours.length > 0)
    candidatesPart2.splice(insertIdx, 0, 
                    ...neighbours.map(n => ({pos: n, elevation: map[n], distance: current.distance + 1, predecessor: current.pos})));
  shortestWayToTargetFrom[current.pos] = current;
  console.log('Part 2: ', Object.keys(shortestWayToTargetFrom).length);
}

const distanceFromLowElevationClosestToTarget = map
  .map((elevation,pos) => (elevation == map[startIdx] ? pos : -1))
  .filter(pos => pos >= 0)
  .filter(pos => !!shortestWayToTargetFrom[pos])
  .map(pos => shortestWayToTargetFrom[pos].distance)
  .reduce((min,distance) => Math.min(min, distance), Infinity);

console.log(`Part 1: ${shortestWayTo[targetIdx].distance} - Part 2: ${distanceFromLowElevationClosestToTarget}`);
