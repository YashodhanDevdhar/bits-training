// **Assignment 5: Callback Functions with map(), filter(), and **reduce()
// Task: Create a processData function that accepts an array of numbers and a callback.
// If the callback is filterOdd, filter out even numbers.
// If the callback is doubleNumbers, double each number.
// If the callback is calculateSum, return the sum of all numbers. 
// Bonus Task: Implement a callback to find the maximum number in the array.

function processData(numArr,callback){
    return callback(numArr);  
};

function filterOdd(numArr){
    return numArr.filter(num => {
        return num % 2 != 0 ;
    });
};

function doubleNumbers(numArr){
    return numArr.map(num => {
        return num * 2;
    });
};

function calculateSum(numArr){
    return numArr.reduce((sum,current,i,numArr)=>{
        return sum += current;
    },0);
};

function maxNum(numArr){
    return numArr.reduce((max,current,i,numArr)=>{
        return (max>current ? max : current);
    },0);
};

const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(processData(numArr,filterOdd));
console.log(processData(numArr,doubleNumbers));
console.log(processData(numArr,calculateSum));
console.log(processData(numArr,maxNum));