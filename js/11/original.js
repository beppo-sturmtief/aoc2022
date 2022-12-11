const parseMonkeyDesc = monkeyDesc => {
	const rows = monkeyDesc.split('\n');
  const opParts = rows[2].split(' ').slice(-3)
  const opValue1 = parseInt(opParts[0]);
  const opValue2 = parseInt(opParts[2]);
  const operation = (opParts[1] == '*')
    ? old => (opValue1 || old) * (opValue2 || old)
    : old => (opValue1 || old) + (opValue2 || old);
  const conditionValue = parseInt(rows[3].split(' ').slice(-1)[0]);
  const trueMonkey = parseInt(rows[4].split(' ').slice(-1)[0]);
  const falseMonkey = parseInt(rows[5].split(' ').slice(-1)[0]);
  const recievingMonkey = worry => (worry % conditionValue == 0 ? trueMonkey : falseMonkey);
  
  return {
    number: parseInt(rows[0].split(' ')[1]),
    items: rows[1].split(/,? +/).slice(3).map(s=>BigInt(s)),
    operation,
    recievingMonkey,
		itemsInspected: 0,
  };
}
const input = (await (await fetch('https://adventofcode.com/2022/day/11/input')).text()).trim();
const monkeys = input.split('\n\n').map(parseMonkeyDesc);

for (let round = 0; round < 20; round++) {
	for (monkey of monkeys) {
		while (monkey.items.length > 0) {
			monkey.itemsInspected++;
      const itemWorry = Math.floor(monkey.operation(monkey.items.shift()) / 3);
      monkeys[monkey.recievingMonkey(itemWorry)].items.push(itemWorry);
    }
  }
}

const monkeyBusiness = monkeys.map(m => m.itemsInspected).sort((a,b)=>b-a).slice(0,2).reduce((a,b)=>a*b, 1);

const monkeysForPart2 = input.split('\n\n').map(parseMonkeyDesc);

for (let round = 0; round < 10000; round++) {
	for (monkey of monkeysForPart2) {
		while (monkey.items.length > 0) {
			monkey.itemsInspected++;
      const itemWorry = monkey.operation(monkey.items.shift());
      monkeysForPart2[monkey.recievingMonkey(itemWorry)].items.push(itemWorry);
    }
  }
}

const monkeyBusinessPart2 = monkeysForPart2.map(m => m.itemsInspected).sort((a,b)=>b-a).slice(0,2).reduce((a,b)=>a*b, 1);

console.log(`Part 1: ${monkeyBusiness} - Part 2: ${monkeyBusinessPart2}`);
