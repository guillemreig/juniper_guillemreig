// Part 1
function sumAll() {
    let sum = 0;
    for (let arg of arguments) {
        sum = sum + arg;
    }
    return sum;
} // Turns out that 'for ... of' works with 'arguments' as it treats it like an array.

console.log(sumAll(5, 10, 15, 100, 200)); //We test the function with the example provided

// Part 2
function waitThenRun(func) {
    setTimeout(func, 1500);
} //Inside the waitThenRun function we run the built-in setTimeout function, and we pass it the argument-function.

waitThenRun(function () {
    console.log("Hello!");
    waitThenRun(function () {
        console.log("Goodbye!");
    }); // logs 'Goodbye!' 1.5 seconds later
}); // logs 'Hello!' 1.5 seconds later

// Part 3
// num <= 0 || isNaN(num) === true

function makeNumberGreatAgain(num) {
    if (num <= 0 || isNaN(num) === true) {
        return "ERROR";
    } else if (num < 1000000) {
        return makeNumberGreatAgain(num * 10);
    } else {
        return num;
    }
}

console.log(makeNumberGreatAgain(1)); //Let's see if it stops after reaching 1.000.000

// Bonus!
