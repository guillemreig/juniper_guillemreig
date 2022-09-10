console.log("");

// Part 1
console.log("Part 1");

function sumAll() {
    let sum = 0;
    for (let arg of arguments) {
        sum = sum + arg;
    }
    return sum;
} // Turns out that 'for ... of' works with 'arguments' as it treats it like an array.

console.log("sumAll(5, 10, 15, 100, 200) :", sumAll(5, 10, 15, 100, 200)); //We test the function with the example provided

// Part 2

setTimeout(function () {
    console.log("");
    console.log("Part 2");
}, 1);

function waitThenRun(func) {
    setTimeout(func, 1500);
} //Inside the waitThenRun function we run the built-in setTimeout function, and we pass it the argument and a fixed timer of 1.5 seconds.

waitThenRun(function () {
    console.log("Hello!");
    waitThenRun(function () {
        console.log("Goodbye!");
    }); // logs 'Goodbye!' 1.5 seconds later
}); // logs 'Hello!' 1.5 seconds later

setTimeout(function () {
    console.log("");
}, 3010);

console.log("");

// Part 3
console.log("Part 3");

function makeNumberGreatAgain(num) {
    if (num <= 0 || isNaN(num) === true) {
        return "ERROR";
    } else if (num < 1000000) {
        return makeNumberGreatAgain(num * 10);
    } else {
        return num;
    }
}

console.log("makeNumberGreatAgain(1) :", makeNumberGreatAgain(1)); //Let's see if it stops after reaching 1.000.000

console.log("");

// Bonus!
console.log("Bonus!");

function getTotaler() {
    console.log("checkpoint 1");
    totalSum = 0; //We use Undeclared Assignment to make a global variable that will be accessible outside the function (For some reason it also works with 'var' declaration. Shouldn't it be a local variable then, inaccessible to the new 'totaler' function?)
    return function (num) {
        totalSum += num;
        return totalSum;
    };
}

var totaler = getTotaler();
console.log(totaler(1)); //1
console.log(totaler(2)); //3
console.log(totaler(5)); //8

console.log("totalSum :", totalSum);
