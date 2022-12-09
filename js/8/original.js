const plus = (a,b) => a+b;
const rotate = grid => grid[0].map((_,i)=>grid.reduce((col,row)=>[...col, row[i]], []));
const input = (await (await fetch('https://adventofcode.com/2022/day/8/input')).text()).trim();
const grid = input.split('\n').map(s=>s.split('').map(d=>parseInt(d)));

const evaluateTreeVisibility = ({visible, highest}, height) => (height>highest) ? {visible: [...visible, 1], highest: height} : {visible: [...visible, 0], highest};

const rotatedGrid = rotate(grid);

const visibleFromNorthGrid = grid.map(col => col.reduce(evaluateTreeVisibility, {visible: [], highest:-1}).visible);
const visibleFromSouthGrid = grid.map(col => col.reduceRight(evaluateTreeVisibility, {visible: [], highest:-1}).visible.reverse());
const visibleFromWestRotatedGrid = rotatedGrid.map(row => row.reduce(evaluateTreeVisibility, {visible: [], highest:-1}).visible);
const visibleFromEastRotatedGrid = rotatedGrid.map(row => row.reduceRight(evaluateTreeVisibility, {visible: [], highest:-1}).visible.reverse());
const visible = visibleFromNorthGrid
  .map((row, ri) => row
       .reduce((count, val, ci) => count + 
               ((val + visibleFromSouthGrid[ri][ci] + visibleFromWestRotatedGrid[ci][ri] + visibleFromEastRotatedGrid[ci][ri]) > 0
               ? 1 
               : 0)))
  .reduce(plus, 0);

const countPrecedingVisibleTrees = ({counts, countsPerHeight}, height) => ({
  counts: [...counts, countsPerHeight[height]],
  countsPerHeight: countsPerHeight.map((count,i) => i<=height ? 1 : (count+1))});

const visibilityToNorthGrid = grid.map(col => col.reduce(countPrecedingVisibleTrees, {counts:[], countsPerHeight: [0,0,0,0,0,0,0,0,0,0]}).counts);
const visibilityToSouthGrid = grid.map(col => col.reduceRight(countPrecedingVisibleTrees, {counts:[], countsPerHeight: [0,0,0,0,0,0,0,0,0,0]}).counts.reverse());
const visibilityToWestRotatedGrid = rotatedGrid.map(row => row.reduce(countPrecedingVisibleTrees, {counts:[], countsPerHeight: [0,0,0,0,0,0,0,0,0,0]}).counts);
const visibilityToEastRotatedGrid = rotatedGrid.map(row => row.reduceRight(countPrecedingVisibleTrees, {counts:[], countsPerHeight: [0,0,0,0,0,0,0,0,0,0]}).counts.reverse());
const maxScenicValue = visibilityToNorthGrid
  .map((row, ri) => row
       .reduce((max, val, ci) => 
               Math.max(max, val * visibilityToSouthGrid[ri][ci] * visibilityToWestRotatedGrid[ci][ri] * visibilityToEastRotatedGrid[ci][ri]),
               0))
  .reduce((max,v)=>v>max?v:max, 0)

console.log(`Part 1: ${visible} - Part2: ${maxScenicValue}`);
