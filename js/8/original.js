const input = (await (await fetch('https://adventofcode.com/2022/day/8/input')).text()).trim();
const grid = input.split('\n').map(s=>s.split().map(d=>parseInt(d));
const rotatedGrid = grid[0].map((_,i)=>grid.reduce((col,row)=>[...col, row[i]], []));

const evaluateTreeVisibility = ({count, highest}, height) => (height>highest) ? {count: count+1, highest: height} : {count, highest};
const plus = (a,b) => a+b;

const visibleFromNorth = grid.map(col => col.reduce(evaluateTreeVisibility, {count: 0, height:-1})).reduce(plus, 0);
const visibleFromSouth = grid.map(col => col.reduceRight(evaluateTreeVisibility, {count: 0, height:-1})).reduce(plus, 0);
const visibleFromWest = rotatedGrid.map(row => row.reduce(evaluateTreeVisibility, {count: 0, height:-1})).reduce(plus, 0);
const visibleFromEast = rotatedGrid.map(row => row.reduceRight(evaluateTreeVisibility, {count: 0, height:-1})).reduce(plus, 0);
const visible = visibleFromNorth + visibleFromSouth + visibleFromWest + visibleFromEast;

console.log(`Part 1: ${visible} - Part2: ${-1}`);
