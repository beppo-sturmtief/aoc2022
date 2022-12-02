const threeBestNourishedElvesCalories = 
	(await (await fetch("https://adventofcode.com/2022/day/1/input")).text()).trim()
	.split('\n\n')
	.map(s => s.split('\n').map(cal => parseInt(cal)).reduce((a,b) => a+b))
	.reduce((maxCs,c) => [...maxCs, c].sort((a,b) => b - a).slice(0,3), [0,0,0]);

console.log(`a) ${threeBestNourishedElvesCalories[0]} b) ${threeBestNourishedElvesCalories.reduce((a,b)=>a+b, 0)}`);
