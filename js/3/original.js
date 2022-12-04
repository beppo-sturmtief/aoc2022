const charCodeOfLowerA = 'a'.charCodeAt(0);
const charCodeOfUpperA = 'A'.charCodeAt(0);

const charToPrio = c => {let o = c.charCodeAt(0) - charCodeOfUpperA; return (o<26) ? (27+o) : (o + charCodeOfUpperA - charCodeOfLowerA + 1); };
const plus = (a,b) => a+b;

const input = (await (await fetch("https://adventofcode.com/2022/day/3/input")).text()).trim();
const rucksacks = input.split('\n').map(s => [s.substring(0,s.length/2).split('').map(charToPrio), s.substring(s.length/2).split('').map(charToPrio)]);
const doubleContents = rucksacks.map(([left,right]) => left.find(prio => right.includes(prio)));
const resultPart1 = doubleContents.reduce(plus)

const groups = input.split('\n').reduce(([current,...rest],newest) => current.length==3 ? [[newest],current,...rest] : [[...current, newest], ...rest], [[]]);
const findCommonItem = ([a,b,c]) => Array.prototype.find.call(a, ch => b.includes(ch) && c.includes(ch));
const badges = groups.map(findCommonItem)
const resultPart2 = badges.map(charToPrio).reduce(plus);

console.log(`Part 1: ${resultPart1} - Part 2: ${resultPart2}`);
