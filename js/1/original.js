// Part 1
const input = (await (await fetch("https://adventofcode.com/2022/day/1/input")).text()).trim();
const elvesCalories = input.split('\n\n').map(s => s.split('\n').map(cal => parseInt(cal)));
const bestNourishedElvesCalories = elvesCalories.map(cals => cals.reduce((a,b) => a+b)).reduce((c1,c2) => Math.max(c1,c2), 0)
console.log('Part1: ', bestNourishedElvesCalories);
// Part 2
const threeBestNourishedElvesCalories = elvesCalories.map(cals => cals.reduce((a,b) => a+b)).reduce((maxCs,c) => (maxCs[0]<c) ? [c, maxCs[0], maxCs[1]] : (maxCs[1]<c) ? [maxCs[0], c, maxCs[1]] : (maxCs[2]<c) ? [maxCs[0], maxCs[1], c] : maxCs , [0,0,0])
const threeBestNourishedElvesTotalCalories = threeBestNourishedElvesCalories.reduce((a,b)=>a+b, 0);
console.log('Part2: ', threeBestNourishedElvesTotalCalories);
