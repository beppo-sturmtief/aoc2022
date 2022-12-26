const input = (await (await fetch('https://adventofcode.com/2022/day/16/input')).text()).trim();
const valves = input
    .split('\n')
    .map(row => row.split(/[=,; ]+/))
    .map(([_, valve, _1, _2, _3, rate, _4, _5, _6, _7, ...neighbours]) => ({id: valve, rate: parseInt(rate), neighbours}))
    .reduce((map, valve) => Object.fromEntries([...Object.entries(map), [valve.id, valve]]), {});

const step = ({pos, prev, totalFlow, rate, opened}) => {
                const valve = valves[pos];
                let options = valve.neighbours
                  .filter(next => next !== prev)
                  .map(next => ({
                    pos: next,
                    totalFlow: totalFlow + rate,
                    rate,
                    opened
                  }));
                
                if (valve.rate > 0 && !opened.includes(pos))
                  options.push({
                    pos,
                    prev: pos,
                    totalFlow: totalFlow + rate + valve.rate,
                    rate: rate + valve,
                    opened: [...opened, pos]
                  });
                return options;
              };

let states = [{pos: 'AA', prev: '', totalFlow: 0, rate: 0, opened: []}];
for (i=0; i < 30; i++) {
  states = states.flatMap(step);
  console.log(states);
}
states = states.sort(({totalFlow: a}, {totalFlow: b}) => a-b);

console.log(`Part 1: ${states[0].totalFlow} - Part 2: ${frequency}`);
