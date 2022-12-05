// Initialization
const input = (await (await fetch("https://adventofcode.com/2022/day/5/input")).text()).trimEnd();

const [initialStackDescs, moves] = input.split('\n\n').map(s => s.split('\n'));
const [stackIndices, ...stackRows] = initialStackDescs
	.reverse()
	.map(s => s.split('')
		.filter((c,i)=>i%4==1)
	);
const initialStacks = stackRows.reduce(
		(stacks,row) => stacks.map((stack,i) => row[i]!=' ' ? [row[i], ...stack] : stack),
		stackIndices.map(_=>[])
	);

// Utils
const addStackHeadToString = (str, stack) => stack.length>0 ? str + stack[0] : str;

// Part 1
const processMove = (stacks, moveString) => {
	// to and from are stack numbers (1..9), not indices
  const [ , count, , from, , to] = moveString.split(' ').map(s=>parseInt(s));
  return [...Array(count).keys()].reduce((stacks, _ignore) => stacks.map((stack, i) => 
                        ((i+1)==from) ? stack.slice(1)
                        : ((i+1)==to) ? [stacks[from-1][0], ...stack]
                        : [...stack]), stacks);
};

const resultPart1 = moves
  .reduce(processMove, initialStacks)
  .reduce(addStackHeadToString, '');

// Part 2
const processMultiMove = (stacks, moveString) => {
  // to and from are stack numbers (1..9), not indices
	const [ , count, , from, , to] = moveString.split(' ').map(s=>parseInt(s));
	return stacks.map((stack, i) => 
                    ((i+1)==from) ? stack.slice(count)
                    : ((i+1)==to) ? [...stacks[from-1].slice(0, count), ...stack]
                    : [...stack]);
};

const resultPart2 = moves
  .reduce(processMultiMove, initialStacks)
  .reduce(addStackHeadToString, '');

// Results
console.log(`Part 1: ${resultPart1} - Part 2: ${resultPart2}`);
