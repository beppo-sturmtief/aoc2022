const input = (await (await fetch("https://adventofcode.com/2022/day/4/input")).text()).trim();

const numberOfFullyContainedPairs = input.split('\n')
	.map(pair => pair
		.split(/[^\d]/)
		.map(i=>parseInt(i)))
	.map(([min1,max1,min2,max2]) => ((min1>=min2) && (max1<=max2)) || ((min2>=min1) && (max2<=max1)))
	.reduce((sum, fullyContaining) => sum + (fullyContaining ? 1 : 0), 0);

const numberOfOverlappingPairs = input.split('\n')
	.map(pair => pair
		.split(/[^\d]/)
		.map(i=>parseInt(i)))
	.map(([min1,max1,min2,max2]) => ((min1<=max2) && (max1>=min2)))
	.reduce((sum, fullyContaining) => sum + (fullyContaining ? 1 : 0), 0)
