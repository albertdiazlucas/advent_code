const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const matrix = input.split('\n').map(row => row.split(''));

console.log(matrix);
let matches = 0;

for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        const a = getAdjacent(matrix, i, j);

        if (a) {
            const diagonal1 = `${a[0] ?? ''}${a[2] ?? ''}${a[4] ?? ''}`;
            const diagonal2 = `${a[1] ?? ''}${a[2] ?? ''}${a[3] ?? ''}`;
            if ((diagonal1 === "MAS" || diagonal1 === "SAM") && (diagonal2 === "MAS" || diagonal2 === "SAM")) {
                console.log('Match found at', i + 1, j + 1);
                matches++;
            }
        }
    }
}

function getAdjacent(matrix, i, j) {
    const current = matrix[i][j] ?? '';
    if (current === 'A') {
        const previousRow = matrix[i - 1] ?? [];
        const nextRow = matrix[i + 1] ?? [];

        const topLeft = previousRow[j - 1] ?? '';
        const topRight = previousRow[j + 1] ?? '';
        const bottomLeft = nextRow[j - 1] ?? '';
        const bottomRight = nextRow[j + 1] ?? '';

        const adjacent = [topLeft, topRight, current, bottomLeft, bottomRight];
        return adjacent;
    } else {
        return undefined;
    }
}

console.log(matches);