const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split('\n');
const column1 = [];
const column2 = [];
const diffs = [];
const similarities = [];

console.log("Splitting lines into columns...");

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const parts = line.split('-');
    column1.push(parseInt(parts[0]));
    column2.push(parseInt(parts[1]));
}

console.log("Sorting columns...");

const orderedColumn1 = column1.sort((a, b) => a - b);
const orderedColumn2 = column2.sort((a, b) => a - b);

console.log("Calculating differences...");

for(let i = 0; i < orderedColumn1.length; i++) {
    const value1 = orderedColumn1[i];
    const diff = orderedColumn2[i] - orderedColumn1[i];
    
    diffs.push(Math.abs(diff));

    const occurrences = orderedColumn2.filter(v => value1 === v);

    similarities.push(occurrences.length * value1);
}

console.log("Sum the differences...");

const sum = diffs.reduce((acc, curr) => acc + curr, 0);
const sumSimilarities = similarities.reduce((acc, curr) => acc + curr, 0);

console.log("Sum of differences: ", sum);
console.log("Sum of similarities: ", sumSimilarities);