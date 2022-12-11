const handleCommand = (states, cmd) => {
  const prevStep = states[states.length - 1];
  if (cmd == 'noop')
    return [...states, prevStep];
  const val = parseInt(cmd.split(' ')[1]);
  return [...states, prevStep, prevStep + val];
}

// Read/prepare input
const input = (await (await fetch('https://adventofcode.com/2022/day/10/input')).text()).trim();
// calculate register states
const registerXStates = input.split('\n')
  .reduce(handleCommand, [1]);

const sumSignalStrengthPart1 = [20, 60, 100, 140, 180, 220].reduce((sum, cycle) => sum + cycle * registerXStates[cycle-1], 0);

const pixels = [...Array(40*6).keys()]
  .reduce((screen, pixel) => screen
          + (pixel%40 == 0 ? '\n':'') 
          + (Math.abs((pixel%40) - registerXStates[pixel]) < 2 ? '#' : '.' ),
  '');
// output result
console.log(`Part 1: ${sumSignalStrengthPart1} - Part 2: ${pixels}`);
