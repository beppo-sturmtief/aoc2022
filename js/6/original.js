const input = (await (await fetch('https://adventofcode.com/2022/day/6/input')).text()).trimEnd();
const {markers: markersPart1} = Array.prototype.reduce.call(input, ({markers, preceding}, current, index) => {
    const currentInPreceding = preceding.indexOf(current);
    if ((currentInPreceding == -1) && (preceding.length == 3))
      return {markers: [...markers, index], preceding : []};
    else if (currentInPreceding == -1)
      return {markers, preceding: [...preceding, current]};
    else
      return {markers, preceding: [...preceding.slice(currentInPreceding+1), current]};
  }, {markers: [], preceding: []});

const {markers: markersPart2} = Array.prototype.reduce.call(input, ({markers, preceding}, current, index) => {
    const currentInPreceding = preceding.indexOf(current);
    if ((currentInPreceding == -1) && (preceding.length == 13))
      return {markers: [...markers, index], preceding : []};
    else if (currentInPreceding == -1)
      return {markers, preceding: [...preceding, current]};
    else
      return {markers, preceding: [...preceding.slice(currentInPreceding+1), current]};
  }, {markers: [], preceding: []});
  
console.log(`Part 1: ${markersPart1[0]+1} - Part 2: ${markersPart2[0]+1}`);
