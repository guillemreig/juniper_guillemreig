var name = "Reig";

function hello() {
    var name = "Guillem";
    console.log(name);
}

hello();
console.log(name);

// IIFE - Immedialtely Invoked Function Expression (in order to prevent declared variables to become part of the Global Scope)
(function () {
    var name = "Guillem";

    function fn() {}
})();

// HOISTING - The computer finds all declared variables and functions and moves them to the top before executing the code

console.log(test); //Undefined,
var test = "Test text";

console.log(square);
console.log(getSquare);

//This function will be Hoisted
function square(number) {
    return number * number;
}

//This function will NOT be Hoisted
var getSquare = function (number) {
    return number * number;
};

// Functions can return functions
// Functions can be passed as arguments of another function (Callback)
// Functions can be assigned to variables
// Functions can be added as properties and in arrays

setTimeout(function () {
    console.log("Timeout!");
}, 2000);

function sayHi() {
    console.log(arguments[0]);
}

sayHi("Guillem", "Gerard", "Marti");

// Recursion - A function that calls itself (need an existing condition!)

function countdown(num) {
    console.log(num);

    if (num > 0) {
        countdown(num - 1);
    }

    console.log(num);
}

countdown(5); // Logs 5 4 3 2 1 0
