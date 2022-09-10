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

function fn(a, b, c) {
    console.log(arguments[0] == a); //logs 'true'
    console.log(arguments[1] == b); //logs 'true'
    console.log(arguments[2] == c); //logs 'true'
}

var exclaim = function (a) {
    var exclamation = a;
    if (arguments[1]) {
        exclamation = arguments[1];
    }
    return exclamation + "!!!";
};

exclaim("hello"); //'hello!!!'
exclaim("hello", "goodbye"); //'goodbye!!!'

console.log();

// Nested functions
// Functions can be defined in other functions.
// Functions that are defined in other functions have access to the local scope of the functions they are defined in.

var outer = function () {
    var f = 100;

    var inner = function () {
        var g = "hello";
        console.log(f, g);
    };

    inner(); //logs 'number', 'string'
    console.log(f, typeof g); //logs 'number', 'undefined'
};
outer();

console.log();

var getCounter = function (num) {
    console.log("num at getCounter(3) :", num);
    return function () {
        console.log("num pre return :", num);
        return console.log("return num++ :", num++); // First it returns 'num', then executes ++ to update 'num' value!
    };
};

var counter = getCounter(3); // var 'num' = 3 created inside getCounter local scope. The function defined inside getCounter can acces it.
counter(); //3
counter(); //4
counter(); //5

console.log();

// Callbacks
// Functions that are passed to other functions are often called callbacks.

setTimeout(function () {
    console.log("Delayed hello!");
}, 1000);

// The built-in function setTimeout takes a callback as its first parameter. The second parameter is a number of milliseconds.
// After the number of milliseconds passes, setTimeout calls the callback.

// Recursion
// Functions can call themselves! This is called recursion.

var cutDownToSize = function (str) {
    if (str.length > 3) {
        console.log(str);
        return cutDownToSize(str.slice(0, -1)); // Each recursion cuts off the last character of the string
    }
    return str; // Once a condition is met, the recursion loop ends by not calling the recursion again
};

console.log(cutDownToSize("teacher")); //'tea'

//  As with loops, when you use recursion you need to be certain that it will not continue infinitely.

console.log();

// Anonymous functions and named function expressions
// Functions without name are are 'anonymous' functions.
// What if you want to define a recursive function using a function expression? You can use a named function expression.
// The name will be in the local scope of the function it names and inaccessible to the outer scope.

var fn = function me(str) {
    console.log("str :", str);
    if (!str) {
        return me("hello");
    }
    return str + "!";
};

console.log(fn("hi")); //'hi!'
console.log(fn()); // 'hello!';

typeof fn; //'function';
typeof me; //'undefined'
