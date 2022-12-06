const input = (await (await fetch('https://adventofcode.com/2022/day/6/input')).text()).trimEnd();
let sop = -1, som = -1, preceding = [];
for (let index = 0; (index < input.length) && (som < 0); index++) {
  const currentInPreceding = preceding.indexOf(input[index]);
  if (currentInPreceding >= 0) 
    preceding.splice(0, currentInPreceding+1);
  if ((sop < 0) && (preceding.length == 3))
    sop = index + 1;
  if ((som < 0) && (preceding.length == 13))
    som = index + 1;
  preceding.push(input[index]);
} 
console.log(`Part 1: ${sop} - Part 2: ${som}`);
