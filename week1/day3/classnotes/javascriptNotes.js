// Global Scope

// Variables that are declared in the global scope with var automatically become properties of the global object.

var a = 100;
a; //100
this.a; //100

console.log("a :", a);
console.log(this.a); // 'undefined' in VSCode

// Undeclared assignment
// In both global and local scope, if you assign a value to a variable without declaring that variable,
// you create a global variable/property.

(function () {
    b = 200;
    b; //200;
    this.b; //200
})();

console.log("b :", b);
console.log(this.b); // 'undefined' in VSCcode

// Hoisting
// In both global and local scope, declarations of variables with var are processed prior to the execution of all other code,
// including assignments.

console.log("c :", c); // undefined. 'c' is declared via hoisting, but its value has not been assigned yet.

var c = 100; // 'var c' runs at the start (hoisting). '100 = c' runs when the line is reached.
var d = 200;
// =
var c, d;
c = 100;
d = 200;
// =
c = 100; // This runs when the line is reached.
d = 200;
var c, d; // This runs at the start (hoisting).

// Function definitions
// Function declarations, like var declarations, are subject to hoisting.
function sayHello() {
    console.log("hello");
}

// Function expression avoids hoisting - your function comes into existence in the spot in which it is defined.
var sayHello = function () {
    console.log("hello");
};

// Local Scope
// Variables declared in a function are in local scope. They are not accessible outside of the function.

var fn = function () {
    var n = 0;
    console.log(typeof n);
};

fn(); //logs 'number'
console.log(typeof n); //logs 'undefined'

// Immediately-invoked function expressions (iife)
// Define a function and immediately execute it.

(function () {
    var e = 1;
    console.log(typeof e); //logs 'number'
})();

console.log(typeof e); //logs 'undefined'

// Extra tip: Functions in Javascript are objects.
//Functions can have properties assigned to them, as we have already seen with the isArray method of the Array constructor.

// The arguments object
// When a function has been called and is running there is available to it in its local scope an 'arguments' object.
// The arguments object is not an array but it is array-like.
//It has a length property whose value corresponds to the number of parameters that was passed to the function.
// It also has properties whose names are integers and hold the values that were passed as parameters.

(function fn(a, b, c) {
    console.log(arguments[0] == a); //logs 'true'
    console.log(arguments[1] == b); //logs 'true'
    console.log(arguments[2] == c); //logs 'true'
})();

var exclaim = function (a) {
    var exclamation = a;
    if (arguments[1]) {
        exclamation = arguments[1];
    }
    return exclamation + "!!!";
};

exclaim("hello"); //'hello!!!'
exclaim("hello", "goodbye"); //'goodbye!!!'
