const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8');

const checkLine = (line) => {
    let erroredIndex = -1;
    let previousAscending = undefined;

    for (let j = 1; j < line.length; j++) {
        const number = parseInt(line[j]);
        const previousNumber = parseInt(line[j - 1]);

        const diff = Math.abs(number - previousNumber);

        if (diff > 0 && diff < 4) {
            const ascending = number > previousNumber;

            if (previousAscending !== undefined && ascending !== previousAscending) {
                erroredIndex = j;
                break;
            }

            previousAscending = ascending;
        } else {
            erroredIndex = j;
            break;
        }
    }

    return erroredIndex;
};

const lines = input.split('\n');
const safe_lines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].split(' ').map(x => parseInt(x));

    let erroredIndex = checkLine(line);

    if (erroredIndex !== -1) {
        let lineWithout0Index = line.slice(1, line.length);
        let lineWithoutLastIndex = line.slice(0, line.length - 1);
        let alteredLine = line.slice(0, erroredIndex - 1).concat(line.slice(erroredIndex));
        let alteredLine2 = line.slice(0, erroredIndex).concat(line.slice(erroredIndex + 1));

        const non0IndexErroredIndex = checkLine(lineWithout0Index);
        const nonLastIndexErroredIndex = checkLine(lineWithoutLastIndex);
        const alteredLineErroredIndex = checkLine(alteredLine);
        const alteredLine2ErroredIndex = checkLine(alteredLine2);

        if(non0IndexErroredIndex === -1 || nonLastIndexErroredIndex === -1 || alteredLineErroredIndex === -1 || alteredLine2ErroredIndex === -1) safe_lines.push(line);
        else {
            const errorObject = {
                line: line,
                alteredLine: {
                    line: alteredLine,
                    erroredIndex: alteredLineErroredIndex,
                },
                lineWithout0Index: {
                    line: lineWithout0Index,
                    erroredIndex: non0IndexErroredIndex,
                },
                lineWithoutLastIndex: {
                    line: lineWithoutLastIndex,
                    erroredIndex: nonLastIndexErroredIndex,
                }
            };
            console.log(errorObject);
            continue;
        }
    } else safe_lines.push(line);
}

console.log(safe_lines.length);