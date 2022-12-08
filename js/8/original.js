const input = (await (await fetch('https://adventofcode.com/2022/day/7/input')).text()).trim();
const grid = input.split('\n').map(s=>s.split().map(d=>parseInt(d));
const rotatedGrid = grid[0].map((_,i)=>grid.reduce((col,row)=>[...col, row[i]], []));

