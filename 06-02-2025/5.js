function processData(numArr, callback) {
  return callback(numArr);
}

function filterOdd(numArr) {
  return numArr.filter((num) => num % 2 != 0);
}

function doubleNumbers(numArr) {
  return numArr.map((num) => num * 2);
}

function calculateSum(numArr) {
  return numArr.reduce((sum, current, i, numArr) => (sum += current), 0);
}

function maxNum(numArr) {
  return numArr.reduce(
    (max, current, i, numArr) => (max > current ? max : current),
    0
  );
}

const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(`Array with odd numbers : [${processData(numArr, filterOdd)}]`);
console.log(`Array with doubled numbers : [${processData(numArr, doubleNumbers)}]`);
console.log(`Sum of array numbers : ${processData(numArr, calculateSum)}`);
console.log(`Max among the array numbers : ${processData(numArr, maxNum)}`);