//Part 1

let argument = NaN; // Assign your argument here

console.log(argument); //for comparison between argument and results
console.log(typeof argument);

function logType(argument) {
    if (typeof argument === "undefined") {
        console.log("undefined!");
    } else if (argument === null) {
        console.log("null!");
    } else if (typeof argument === "number" && isNaN(argument) !== true) {
        console.log("number!");
    } else if (typeof argument === "number" && isNaN(argument)) {
        console.log("not a number!");
    } else if (typeof argument === "string") {
        console.log("string!");
    } else if (typeof argument === "boolean") {
        console.log("boolean!");
    } else if (typeof argument === "bigint") {
        console.log("bigint!");
    } else if (typeof argument === "function") {
        console.log("function!");
    } else if (
        typeof argument === "object" &&
        Array.isArray(argument) !== true
    ) {
        console.log("object!");
    } else if (Array.isArray(argument)) {
        console.log("array!");
    } else {
        console.log("I have no idea!");
    }
}

logType(argument);

//Part 2

var a = {
    Berlin: "Germany",
    Paris: "France",
    "New York": "USA",
};

var b = {};

for (var property in a) {
    b[a[property]] = property;
}

console.log(b);

//Part 3

let counter = 10;

while (counter > 0) {
    console.log(counter);
    counter--;
}
