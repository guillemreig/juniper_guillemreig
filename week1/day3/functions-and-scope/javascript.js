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
} //Inside the waitThenRun function we run the built-in setTimeout function, and we reuse in it the argument.

function testFunction() {
    console.log("This should appear last!");
} //The function that we will provide as an argument for testing purposes.

waitThenRun(testFunction);

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
