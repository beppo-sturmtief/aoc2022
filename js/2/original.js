// Part 1
const input = (await (await fetch('https://adventofcode.com/2022/day/2/input')).text()).trim();
const draws = input.split('\n');

const map = {'A X': 1+3, 'A Y': 6+2, 'A Z': 0+3, 'B X': 0+1, 'B Y': 3+2,'B Z': 6+3, 'C X': 6+1, 'C Y': 0+2, 'C Z': 3+3}
const sum = draws.map(d => map[d]).reduce((a,b) => a+b);
console.log('Part 1', sum);

// Part 2
const winloosemap = {'A X': 3+0, 'A Y': 1+3, 'A Z': 2+6, 'B X': 1+0, 'B Y': 2+3,'B Z': 3+6, 'C X': 2+0, 'C Y': 3+3, 'C Z': 1+6}
const winloosesum = draws.map(d => winloosemap[d]).reduce((a,b) => a+b);
console.log('Part 2', winloosesum);
