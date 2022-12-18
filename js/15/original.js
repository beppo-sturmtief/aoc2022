const input = (await (await fetch('https://adventofcode.com/2022/day/15/input')).text()).trim();
const sensors = input
                  .split('\n')
                  .map(l => 
                       l.split(/[^0-9]+/)
                          .filter(s => s.length > 0)
                          .map(s => parseInt(s)))
                  .map(([sx,sy,bx,by]) => ({
                            sensor: {x: sx, y: sy},
                            beacon: {x: bx, y: by},
                            distance: Math.abs(sx-bx) + Math.abs(sy - by)
                  }));
const noBeaconRanges2000000 = sensors
  .filter(s => s.distance > Math.abs(s.sensor.y - 2000000))
  .map(s => [
    s.sensor.x - (s.distance - Math.abs(s.sensor.y - 2000000)),
    s.sensor.x + (s.distance - Math.abs(s.sensor.y - 2000000))])
  .sort(([min1,_],[min2,__]) => min1-min2);
const uniqueNoBeaconRanges2000000 = noBeaconRanges2000000
  .reduce(([last, ...rest], current) => 
            (current[1] <= last[1] ? [last, ...rest]
            : (current[0] <= last[1] ? [[last[0], current[1]], ...rest]
            : [current, last, ...rest]))
          , [noBeaconRanges2000000[0]])
  .reverse();
const numNoBeaconPositions2000000 = uniqueNoBeaconRanges2000000
  .reduce((count, [min,max]) => count + max - min, 0);

let frequency = -1;
for (let y = 0; y < 4000000; y++) {
  const noBeaconRanges = sensors
    .filter(s => s.distance > Math.abs(s.sensor.y - 4000000))
    .map(s => [
      s.sensor.x - (s.distance - Math.abs(s.sensor.y - 4000000)),
      s.sensor.x + (s.distance - Math.abs(s.sensor.y - 4000000))])
    .sort(([min1,_],[min2,__]) => min1-min2);
  const uniqueNoBeaconRanges = noBeaconRanges
    .reduce(([last, ...rest], current) => 
              (current[1] <= last[1] ? [last, ...rest]
              : (current[0] <= last[1] ? [[last[0], current[1]], ...rest]
              : [current, last, ...rest]))
            , [noBeaconRanges[0]])
    .reverse();
  const rangeEndingBetween0And4000000 = uniqueNoBeaconRanges.find(([min,max]) => min <= 0 && max < 4000000);
  if (rangeEndingBetween0And4000000) {
    frequency = (rangeEndingBetween0And4000000[1] + 1) * 4000000 + y;
    break;
  }
}

console.log(`Part 1: ${numNoBeaconPositions2000000} - Part 2: ${frequency}`);
