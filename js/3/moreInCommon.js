// common utils
const plus = (a,b) => a+b;

const charCodeOfLowerA = 'a'.charCodeAt(0);
const charCodeOfUpperA = 'A'.charCodeAt(0);

const charToPrio = c => {let o = c.charCodeAt(0) - charCodeOfUpperA; return (o<26) ? (27+o) : (o + charCodeOfUpperA - charCodeOfLowerA + 1); };

const findCommonItem = ([first, ...rest]) => Array.prototype.find.call(first, ch => rest.reduce((all,current) => all & current.includes(ch), true));
// input
const input = (await (await fetch("https://adventofcode.com/2022/day/3/input")).text()).trim();

// part 1
const compartments = input.split('\n').map(s => [s.substring(0,s.length/2), s.substring(s.length/2)]);

// part 2 (inverse order!)
const groups = input.split('\n').reduce(([current,...rest],newest) => current.length==3 ? [[newest],current,...rest] : [[...current, newest], ...rest], [[]]);

// result
const resultPart1 = compartments.map(findCommonItem).map(charToPrio).reduce(plus);
const resultPart2 = groups.map(findCommonItem).map(charToPrio).reduce(plus);

console.log(`Part 1: ${resultPart1} - Part 2: ${resultPart2}`);
