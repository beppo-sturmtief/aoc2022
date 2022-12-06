const input = (await (await fetch('https://adventofcode.com/2022/day/6/input')).text()).trimEnd();
const {sop, som} = Array.prototype.reduce.call(input, ({sop, som, preceding}, current, index) => {
    let nextState = {sop, som, preceding};
    const currentInPreceding = preceding.indexOf(current);
    if (currentInPreceding == -1) {
      if ((sop < 0) && (preceding.length == 3))
        nextState.sop = index + 1;
      if ((som < 0) && (preceding.length == 13))
        nextState.som = index + 1;
      
      if (preceding.length < 13)
        nextState.preceding = [...preceding, current];
    } else (preceding.length < 13)
      nextState.preceding = [...preceding.slice(currentInPreceding+1), current];
    return nextState;
  }, {sop: -1, som: -1, preceding: []});
  
console.log(`Part 1: ${sop} - Part 2: ${som}`);
