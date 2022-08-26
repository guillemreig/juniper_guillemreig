var x;
var doubleX;

x = 7;

function timesTwo(num) {
    return num * 2;
}

doubleX = timesTwo(x);

var numbers;

numbers = [x, doubleX];

for (var element of numbers) {
    console.log(element);
}

numbers = {};

numbers.y = doubleX;

// For testing purposes
console.log(numbers);
