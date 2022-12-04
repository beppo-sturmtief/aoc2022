const plus = (a,b) => a+b;
const input = (await (await fetch("https://adventofcode.com/2022/day/4/input")).text()).trim();
const pairs = input.split('\n')
	.map(pair => pair
		.split(/[^\d]/)
		.map(i=>parseInt(i)));

const numberOfFullyContainedPairs = pairs
	.map(([min1,max1,min2,max2]) => ((min1>=min2) && (max1<=max2)) || ((min2>=min1) && (max2<=max1)))
	.reduce(plus);

const numberOfOverlappingPairs = pairs
	.map(([min1,max1,min2,max2]) => ((min1<=max2) && (max1>=min2)))
	.reduce(plus)

console.log(`Part 1: ${numberOfFullyContainedPairs} - Part 2: ${numberOfOverlappingPairs}`);
