// PART 1

const input = require('fs').readFileSync('input.txt', 'utf8');

const rules = input.split('-')[0].split('\n').map(rule => rule.replaceAll('\r', '')).filter(rule => rule.length > 0);
const updates = input.split('-')[1].split('\n').map(rule => rule.replaceAll('\r', '')).filter(rule => rule.length > 0);
let sum = 0;
let incorrectSum = 0;

for (const update of updates) {
    const splittedUpdate = update.split(',');
    const orderedUpdate = [...splittedUpdate.map(u => { return 0; })];

    for (const u of splittedUpdate) {
        let lefts = 0;
        let rights = 0;

        const uRules = rules.filter(rule => rule.includes(u)).filter(rule => {
            const n1 = rule.split('|')[0];
            const n2 = rule.split('|')[1];

            return splittedUpdate.some(su => su === n1) && splittedUpdate.some(su => su === n2);
        });

        for (const uRule of uRules) {
            const n1 = uRule.split('|')[0];

            if (n1 === u) lefts++;
            else rights++;
        }

        if (lefts === splittedUpdate.length - 1) orderedUpdate[0] = u;
        else if (rights === splittedUpdate.length - 1) orderedUpdate[orderedUpdate.lastIndexOf(0)] = u;
        else {
            orderedUpdate[rights] = u;
        }
    }

    if (orderedUpdate.join(',') === update) {
        const r = orderedUpdate.length % 2;

        if (r > 0) {
            const middle = Math.floor(orderedUpdate.length / 2);
            const middleValue = orderedUpdate[middle];

            sum += parseInt(middleValue);
        }
    } else {
        // PART 2
        const r = orderedUpdate.length % 2;

        if (r > 0) {
            const middle = Math.floor(orderedUpdate.length / 2);
            const middleValue = orderedUpdate[middle];

            incorrectSum += parseInt(middleValue);
        }
    }
}

console.log("Correct ordered sum:", sum);
console.log("Incorrect ordered sum:", incorrectSum);