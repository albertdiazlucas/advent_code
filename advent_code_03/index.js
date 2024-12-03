const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

// const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const dos = input.split('do()');
let result = 0;

dos.forEach(d => {
    let donts = [];
    const regex = /don't\(\)/g;
    if (d.match(regex) && d.match(regex).length > 0) {
        donts = d.split("don't()");
    }

    if (donts.length > 0) {
        const operations = donts[0].match(/mul\(\d+,\d+\)/g);

        operations.forEach(operation => {
            const [_, a, b] = operation.match(/mul\((\d+),(\d+)\)/);
            const intA = parseInt(a);
            const intB = parseInt(b);
            result += intA * intB;
        });
    } else {
        const operations = d.match(/mul\(\d+,\d+\)/g);

        operations.forEach(operation => {
            const [_, a, b] = operation.match(/mul\((\d+),(\d+)\)/);
            const intA = parseInt(a);
            const intB = parseInt(b);
            result += intA * intB;
        });
    }
});

console.log(result);