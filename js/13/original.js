// Input
const input = (await (await fetch('https://adventofcode.com/2022/day/13/input')).text()).trim();
const pairs = input.split('\n\n').map(pair => pair.split('\n').map(JSON.parse));

// Utilities
const compareInts = (left, right) => left < right ? 1 : left > right ? -1 : 0;
const comparePair = ([left, ...restLeft], [right, ...restRight]) => {
  if (Number.isInteger(left) && Number.isInteger(right))
    return compareInts(left, right) || comparePair(restLeft, restRight);
  if (Number.isInteger(left) && right)
    return comparePair([left], right) || comparePair(restLeft, restRight);
  if (left && Number.isInteger(right))
    return comparePair(left, [right]) || comparePair(restLeft, restRight);
  if (left && right)
    return comparePair(left, right) || comparePair(restLeft, restRight);
  return left != undefined ? -1 : right != undefined ? 1 : 0;
};

// Part 1
const correctlyOrderedPairs = pairs
    .map(([left, right]) => comparePair(left, right))
    .reduce((sum, cmp, index) => sum + (cmp == 1 ? index + 1 : 0), 0);

// Part 2
const orderedPackets = [...pairs.flatMap(p=>p), [[2]], [[6]]].sort((a,b) => -comparePair(a,b));

const decoderKey = (1 + orderedPackets.findIndex(p => JSON.stringify(p) == '[[2]]'))
  * (1 + orderedPackets.findIndex(p => JSON.stringify(p) == '[[6]]'));

console.log(`Part 1: ${correctlyOrderedPairs} - Part 2: ${decoderKey}`);
