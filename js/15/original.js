// utils
const sensorDescToArray = desc => desc.split(/[^0-9-]+/)
                          .filter(s => s.length > 0)
                          .map(s => parseInt(s));
const arrayToSensorObj = ([sx,sy,bx,by]) => ({
                            sensor: {x: sx, y: sy},
                            beacon: {x: bx, y: by},
                            distance: Math.abs(sx-bx) + Math.abs(sy - by)
                          });

const findRangesWithoutBeaconsAtY = (y, sensors) => sensors
  .filter(s => s.distance > Math.abs(s.sensor.y - y))
  .map(s => [
    s.sensor.x - (s.distance - Math.abs(s.sensor.y - y)),
    s.sensor.x + (s.distance - Math.abs(s.sensor.y - y))])
  .sort(([min1,_],[min2,__]) => min1-min2);
const mergeSortedRanges = ranges => ranges
  .reduce(([last, ...rest], current) => 
            (current[1] <= last[1] ? [last, ...rest]
            : (current[0] <= last[1] ? [[last[0], current[1]], ...rest]
            : [current, last, ...rest]))
          , [ranges[0]])
  .reverse();

// input

const input = (await (await fetch('https://adventofcode.com/2022/day/15/input')).text()).trim();
const sensors = input
                  .split('\n')
                  .map(sensorDescToArray)
                  .map(arrayToSensorObj);

// part 1
const noBeaconRanges2000000 = findRangesWithoutBeaconsAtY(2000000, sensors);
const uniqueNoBeaconRanges2000000 = mergeSortedRanges(noBeaconRanges2000000);
const numNoBeaconPositions2000000 = uniqueNoBeaconRanges2000000
  .reduce((count, [min,max]) => count + max - min, 0);

// part 2
let frequency = -1;
for (let y = 0; y <= 4000000; y++) {
  const noBeaconRanges = findRangesWithoutBeaconsAtY(y, sensors)
  const uniqueNoBeaconRanges = mergeSortedRanges(noBeaconRanges);
  const firstRangeNeighbouringGapBetween0And4000000 = uniqueNoBeaconRanges.find(([min,max]) => 
                 (min <= 0 && max < 4000000) || (min == 1));
  if (firstRangeNeighbouringGapBetween0And4000000) {
    frequency = (firstRangeNeighbouringGapBetween0And4000000[0] == 1
                 ? 0 
                 : firstRangeNeighbouringGapBetween0And4000000[1] + 1) 
        * 4000000 + y;
    break;
  }
}

console.log(`Part 1: ${numNoBeaconPositions2000000} - Part 2: ${frequency}`);
