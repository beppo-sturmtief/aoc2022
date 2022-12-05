const input = (await (await fetch("https://adventofcode.com/2022/day/5/input")).text()).trimEnd();

const [initialStackDescs, moves] = input.split('\n\n').map(s => s.split('\n'));
const [stackIndices, ...stacks] = initialStackDescs
	.reverse()
	.map(s => s.split('')
		.filter((c,i)=>i%4==1)
	);
const initialStacks = stacks.reduce(
		(stacks,row) => stacks.map((stack,i) => row[i]!=' ' ? [row[i], ...stack] : stack),
		stackIndices.map(_=>[])
	);

const processMove = (stacks, moveString) => {
	const [ , count, , fromPlus1, , toPlus1] = moveString.split(' ').map(s=>parseInt(s));
	const [from, to] = [fromPlus1-1, toPlus1-1];
	console.log(count, from, to, stacks);
	for (let i=0; i < count; i++) {
		const [moved, ...movedFrom] = stacks[from];
		const movedTo = [moved, ...stacks[to]];
		stacks = stacks.map((stack, i) => (i==from) ? movedFrom : (i==to) ? movedTo : [...stack]);
	}
	return stacks;
};

const finalStacks = moves.reduce(processMove, initialStacks);

const resultPart1 = finalStacks.reduce((str, stack) => stack.length>0 ? str + stack[0] : str, '');

const processMultiMove = (stacks, moveString) => {
	const [ , count, , fromPlus1, , toPlus1] = moveString.split(' ').map(s=>parseInt(s));
	const [from, to] = [fromPlus1-1, toPlus1-1];
	console.log(count, from, to, stacks);

	const moved = stacks[from].slice(0, count);
	const movedFrom = stacks[from].slice(count);
	const movedTo = [...moved, ...stacks[to]];
	stacks = stacks.map((stack, i) => (i==from) ? movedFrom : (i==to) ? movedTo : [...stack]);
	return stacks;
};

const finalStacksPart2 = moves.reduce(processMultiMove, initialStacks);

const resultPart2 = finalStacksPart2.reduce((str, stack) => stack.length>0 ? str + stack[0] : str, '');
