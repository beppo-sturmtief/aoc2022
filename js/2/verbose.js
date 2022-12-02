const pointsForResult = result => ({lose: 0, draw: 3, win: 6})[result];
const pointsForChoice = choice => ({rock: 1, paper: 2, scissors: 3})[choice];

const roundResult = (myChoice, opponentsChoice) => ({
    rock: { rock: 'draw', paper: 'lose', scissors: 'win'},
    paper: { rock: 'win', paper: 'draw', scissors: 'lose'},
    scissors: { rock: 'lose', paper: 'win', scissors: 'draw'}
})[myChoice][opponentsChoice];

const pointsForRound = (myChoice, opponentsChoice) => pointsForResult(roundResult(myChoice, opponentsChoice)) + pointsForChoice(myChoice);
const sum = (a,b) => a+b;

const decodeOpponentsChoice = choice => ({A: 'rock', B: 'paper', C: 'scissors'})[choice];

const guidePart1 = guide => ({X: 'rock', Y: 'paper', Z: 'scissors'})[guide];
const guidePart2 = guide => ({X: 'lose', Y: 'draw', Z: 'win'})[guide];

const chooseForResult = (desiredResult, opponentsChoice) => ({
    lose: { rock: 'scissors', paper: 'rock', scissors: 'paper'},
    draw: { rock: 'rock', paper: 'paper', scissors: 'scissors'},
    win: { rock: 'paper', paper: 'scissors', scissors: 'rock'}
})[desiredResult][opponentsChoice];

const input = (await (await fetch('https://adventofcode.com/2022/day/2/input')).text()).trim();
const rounds = input.split('\n');

const actualPlayedRoundsPart1 = rounds.map(([codedOpponentsChoice,_,guide]) => ({
    myChoice: guidePart1(guide),
    opponentsChoice: decodeOpponentsChoice(codedOpponentsChoice)
}));
const actualPlayedRoundsPart2 = rounds.map(([codedOpponentsChoice,_,guide]) => {
    const opponentsChoice = decodeOpponentsChoice(codedOpponentsChoice);
    const myChoice = chooseForResult(guidePart2(guide), opponentsChoice);
    return {myChoice, opponentsChoice};
});

const resultPart1 = actualPlayedRoundsPart1
    .map(({myChoice, opponentsChoice}) => pointsForRound(myChoice, opponentsChoice))
    .reduce(sum);

const resultPart2 = actualPlayedRoundsPart2
    .map(({myChoice, opponentsChoice}) => pointsForRound(myChoice, opponentsChoice))
    .reduce(sum);

console.log(`Part 1: ${resultPart1} - Part 2: ${resultPart2}`);
