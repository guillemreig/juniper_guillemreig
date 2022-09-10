/* There are eight data 'types' in the Javascript language:

Undefined - 
null - 
Boolean - true / false
Number - 90210, 3.1, -55
String - "Why, hello there!"
Symbol - Unique values that can serve in the place of strings as keys for the properties of objects
BigInt - For representing numbers larger than 253 - 1
Object

*/

// typeof - used to check the type of a value

typeof "test"; // 'string'

typeof 99; // 'number'

typeof function () {}; // 'function'

typeof {}; //'object'

typeof [1, 2, 3]; // 'object'. typeof returns 'object' for arrays!

typeof Null; // 'object'. typeof null returns 'object'!

typeof NaN; // 'number'. typeof NaN returns 'number'!

// Array.isArray() to test if something is an array

Array.isArray([1, 2, 3]); // true
Array.isArray("pizza"); // false

// '=== null' to test if something is null

var n = null;
n === null; // true

// isNaN() to test wether something is NaN use

NaN === NaN; // false!
isNaN(NaN); // true

// There is also a version attached to the Number constructor but it behaves slightly differently.
// If the argument passed to the global isNaN is not of the type 'number', it will convert it to a number
// and return true if the result of that conversion is NaN and false otherwise.
// Number.isNaN will not convert its argument and will return false if the type of argument passed to it
// is not number whether or not it can be converted to a number.

isNaN(NaN); // true
Number.isNaN(NaN); // true

isNaN("1"); // false
Number.isNaN("1"); // false

isNaN("not a number!"); // true!
Number.isNaN("not a number!"); // false

// Example: isNaN()
isNaN(NaN); // true
isNaN(); // true!
isNaN(7); // false
isNaN(null); // false
isNaN(undefined); // true!
isNaN(function () {}); // true!
isNaN({}); // true!
isNaN([]); // false

// Example Number.isNaN()
Number.isNaN(NaN); // true
Number.isNaN(); // false
Number.isNaN(7); // false
Number.isNaN(null); // false
Number.isNaN(undefined); // false
Number.isNaN(function () {}); // false
Number.isNaN({}); // false
Number.isNaN([]); // false

// Constructors
// Constructors for strings, numbers, and booleans return primitive values wrapped in an object

typeof "string"; // 'string'
typeof 7; // 'number'

typeof new String("string"); // 'object'
typeof new Number(55); //'object'

// When used without the new keyword, these functions can be used to cast strings to numbers, numbers to strings, booleans to numbers, etc.

String(666); // "666"
String(true); // "true"

Number("100"); // 100
Number("pizza"); // NaN
Number(""); // 0

Number(true); // 1
Number(false); // 0

Number(undefined); // NaN
Number(null); // 0
Number(NaN); // NaN

Boolean(1); // true
Boolean(0); // false
Boolean(7); // true

// Truthiness and Falsiness
// Every value in Javascript is either truthy or falsey.
// A truthy value will be treated as true in conditional contexts and falsey values will be treated as false.

// truthy
1, 3.14, -45;
"Hello", "1", "0";
[];
({});
(function () {});
999n;

// falsey:
0;
0n;
("");
null;
undefined;
NaN;
console.log("console.log() =", console.log()); // It reads as 'undefined', so 'falsey'

// String tips
console.log("Don't mess a \"quote\" inside a string with '\\'."); // Using \ to write " and ' (option + shift + 7 in GER MacBook)

var name = "Guillem";
console.log(`Hi! My name is ${name}!`); // String interpolation using 'template literals' with 'placeholders'

console.log(`This is a
multiple line
string.`); // Template literals for multi-line strings

// Logical operators

// ! (logical NOT) - returns true for false or falsey values and returns false for true or truthy values.
// You can double up in order to cast a truthy value to true or a falsey value to false.

var a = !null; //a is true
var b = !100; //b is false

var c = !!null; //c is false
var d = !!100; //d is true

// && (logical AND) - The item on the right side is only evaluated if the item on the left side is true or truthy.

var a = true && 100; //a is 100
var b = false && 100; //b is false

// || (logical OR) - The item on the right side is only evaluated if the item on the left side is false or falsey.

var a = true || 100; //a is true
var b = false || 100; //b is 100

// Many Javascript coders like to use && and || in a sort of shorthand conditional

a && doSomething(); //only calls doSomething if a is true or truthy
a || doSomethingElse(); //only calls doSomethingElse if a is false or falsey

function doSomething() {
    console.log("something");
}
function doSomethingElse() {
    console.log("something elese");
}

var c =
    function () {
        console.log("checkpoint 1"); // EXTRA: This function is not running.
        return false; // The && operator reads it as 'true' because all functions are 'truthy'.
    } &&
    (function () {
        console.log("checkpoint 2");
        return false; // EXTRA: This function is running.
    })(); // EXTRA: We converted the function to an Immediately-Invoked Function Expression so that it would run and use the return value in the && check.

console.log("c :", c); // Because the second value in the check is 'false'

d = console.log("checkpoint 3") || console.log("checkpoint 4");
console.log("d :", d); // Because the second value in the check is 'undefined'

// Comparison Operators

// == (equality) and != (inequality)
// if the items on either side are not of the same type, automatic type conversion (coercion) is performed before comparison.

1 == 1; //true
1 == "1"; //true
1 == true; //true

// === (strict equality) and !== (strict inequality)
// no coercion takes place.

1 === 1; //true
1 === "1"; //false
1 === true; //false

// < (less than) and > (greater than) and <= (less than or equal) and >= (greater than or equal)

4 < 5; //true
4 <= 5; //true

5 > 5; //false
5 >= 5; //true

// Conditional Operator

// Ternary operator
// If the item to the left of the ? is true or truthy, the item immediately to the right of the ? is evaluated.
// If the item to the left of the ? is false or falsey, the item to the right of the : is evaluated.

var a = null ? 100 : "nice"; //a is 'nice'
var b = 100 ? null : "nice"; // b is null

// Conditionals

// if/else

if (false) {
    doSomething();
} else if (true) {
    doSomethingElse();
} else {
} // Does something else

// switch

switch (name) {
    case "Esmerelda":
        doSomething();
        break;
    case "Alejandro":
        doSomethingElse();
        break;
    default:
        console.log("welp!");
}

// Loops

// while

var i = 1;
while (i < 4) {
    console.log(i);
    i++;
}

// do ... while
// do...while works like while but it guarantees that the code contained in the do block runs at least once.

var i = 0;
do {
    doSomething();
} while (i > 0);

// for
// (initial setup; iteration check; do after each iteration)
for (var i = 0; i < 5; i++) {
    console.log(i);
}

// for...in
// used for iterating over the property names of an object.

var obj = {
    a: 1,
    b: 2,
    c: 3,
};

for (var p in obj) {
    console.log("The value of obj." + p + " is " + obj[p]);
}

// for...of
// used for iterating over objects that qualify as iterable. Arrays are iterable.

var a = [1, 2, 3];
for (var val of a) {
    console.log(val); //logs 1, 2, 3
}
