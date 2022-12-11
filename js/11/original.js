const parseMonkeyDesc = monkeyDesc => {
  const rows = monkeyDesc.split('\n');
  const opParts = rows[2].split(' ').slice(-3)
  const opValue1 = opParts[0] == 'old' ? false : parseInt(opParts[0]);
  const opValue2 = opParts[2] == 'old' ? false : parseInt(opParts[2]);
  const operation = (opParts[1] == '*')
    ? old => (opValue1 || old) * (opValue2 || old)
    : old => (opValue1 || old) + (opValue2 || old);
  const conditionValue = parseInt(rows[3].split(' ').slice(-1)[0]);
  const trueMonkey = parseInt(rows[4].split(' ').slice(-1)[0]);
  const falseMonkey = parseInt(rows[5].split(' ').slice(-1)[0]);
  const recievingMonkey = worry => worry % conditionValue == 0 ? trueMonkey : falseMonkey;
  
  return {
    number: parseInt(rows[0].split(' ')[1]),
    initialItems: rows[1].split(/,? +/).slice(3).map(s=>parseInt(s)),
    operation,
    recievingMonkey,
    conditionValue
  };
}
const input = (await (await fetch('https://adventofcode.com/2022/day/11/input')).text()).trim();
const monkeys = input.split('\n\n').map(parseMonkeyDesc);

const perMonkeyDataPart1 = monkeys.map(monkey => ({
  itemsInspected: 0,
  itemWorries: [...monkey.initialItems]
}));

for (let round = 0; round < 20; round++) {
  for (monkey of monkeys) {
    const monkeyData = perMonkeyDataPart1[monkey.number];
    while (monkeyData.itemWorries.length > 0) {
      monkeyData.itemsInspected++;
      const itemWorries = Math.floor(monkey.operation(monkeyData.itemWorries.shift()) / 3);
      perMonkeyDataPart1[monkey.recievingMonkey(itemWorries)].itemWorries.push(itemWorries);
    }
  }
}

const monkeyBusiness = perMonkeyDataPart1.map(m => m.itemsInspected).sort((a,b)=>b-a).slice(0,2).reduce((a,b)=>a*b, 1);


const conditionDivisors = [...new Set(monkeys.map(m=>m.conditionValue).sort((a,b)=>a-b))];
const perMonkeyDataPart2 = monkeys.map(monkey => ({
  itemsInspected: 0,
  itemWorries: monkey
	.initialItems
	.map(item => conditionDivisors
	     .map(divisor => item % divisor))
}));

for (let round = 0; round < 10000; round++) {
  for (monkey of monkeys) {
    const monkeyData = perMonkeyDataPart2[monkey.number];
    while (monkeyData.itemWorries.length > 0) {
      monkeyData.itemsInspected++;
      const itemWorries = monkeyData.itemWorries.shift().map((worry, i) => monkey.operation(worry) % conditionDivisors[i]);
      perMonkeyDataPart2[monkey.recievingMonkey(itemWorries[conditionDivisors.indexOf(monkey.conditionValue)])].itemWorries.push(itemWorries);
    }
  }
}

const monkeyBusinessPart2 = perMonkeyDataPart2.map(m => m.itemsInspected).sort((a,b)=>b-a).slice(0,2).reduce((a,b)=>a*b, 1);

console.log(`Part 1: ${monkeyBusiness} - Part 2: ${monkeyBusinessPart2}`);
