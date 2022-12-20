export function getStandardDeviation(array: Array<any>) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

export function getAverage(array: Array<any>) {
    const sum = array.reduce((a, b) => a + b, 0);
    const avg = (sum / array.length) || 0;
    return avg;
}

export function getMedian(array: Array<any>) {
    if (array.length === 0) throw new Error("No inputs");

    array.sort(function (a, b) {
        return a - b;
    });

    var half = Math.floor(array.length / 2);

    if (array.length % 2)
        return array[half];

    return (array[half - 1] + array[half]) / 2.0;
}

export function processFormula(formula: string, numList: Array<any>) {
    // const normalMathSybmol = '*' || '+' || '-' || '/';
    // console.log(formula.split(normalMathSybmol));
    // console.log(formula.match(/[^+/*()-]+/g));

    let newFormula = formula;
    numList.map((num, index) => {
        newFormula = newFormula.replace(`%${index + 1}`, num);
    })
    console.log(newFormula);
    // console.log(eval(newFormula));  
    return eval(newFormula);
}