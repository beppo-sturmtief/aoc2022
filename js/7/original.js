
const input = (await (await fetch('https://adventofcode.com/2022/day/7/input')).text()).trim();
const lines = input.split('\n');

const findDir = (path, dirs) => dirs.find(dir => dir.path == path);
const parentPath = childPath => childPath.slice(0, childPath.lastIndexOf('/'));
const parseCommand = ({dirs, currentDir}, cmd) => {
  if (cmd == '$ cd /')
    return {dirs, currentDir: ''};
  else if (cmd == '$ cd ..') {
    const curSize = findDir(currentDir, dirs).size;
    const parent = parentPath(currentDir);
    return {dirs: dirs.map(d => ({path: d.path, size: d.size + (d.path == parent ? curSize : 0)})), currentDir: parent};
  } else if (cmd.startsWith('$ cd '))
    return {dirs, currentDir: `${currentDir}/${cmd.substring(5)}`};
  else if (cmd == '$ ls')
    return {dirs, currentDir};
  else if (cmd.startsWith('dir '))
    return {dirs: [...dirs, {path: `${currentDir}/${cmd.substring(4)}`, size: 0}], currentDir};
  else 
    return {dirs: dirs.map(d => ({path: d.path, size: d.size + (d.path == currentDir ? parseInt(cmd) : 0)})), currentDir};
};

const preliminaryDirs = lines
  .reduce(parseCommand, {dirs: [{path:'', size:0}], currentDir: ''});

const dirs = preliminaryDirs.currentDir
  .split('/')
  .slice(1) // no 'cd ..' from top dir
  .map(dir => '$ cd ..')
  .reduce(parseCommand, preliminaryDirs)
  .dirs;
const resultPart1 = dirs
  .map(d => d.size)
  .filter(s => s <= 100000)
  .reduce((a,b) => a+b, 0);

const totalSpace = 70000000;
const minFreeSpace = 30000000;
const freeSpace = totalSpace - dirs[0].size;
const minNeededSpace = minFreeSpace - freeSpace;
const resultPart2 = dirs
  .map(d => d.size)
  .filter(s => s >= minNeededSpace)
  .sort((a,b) => a-b)[0];

console.log(`Part 1: ${resultPart1} - Part 2: ${resultPart2}`);
