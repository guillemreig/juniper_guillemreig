console.log(""); //These are for spacing the console log results.

// Part 1
console.log("Part 1");

function each(arrObj, func) {
    if (typeof arrObj === "object" && Array.isArray(arrObj) !== true) {
        for (var property in arrObj) {
            func(arrObj[property], property);
        } //Make sure it is an object and not an array (they have the same typeOf), and then run on it a 'for ... in' loop
    } else if (Array.isArray(arrObj)) {
        for (var element of arrObj) {
            func(element, arrObj.indexOf(element));
        } //If it is an array we run on it a 'for ... of' loop instead
    }
}

each(
    {
        a: 1,
        b: 2,
    },
    function (val, name) {
        console.log("The value of " + name + " is " + val);
    }
); // logs 'the value of a is 1' and 'the value of b is 2'

each(["a", "b"], function (val, idx) {
    console.log("The value of item " + idx + " is " + val);
}); // logs 'the value of item 0 is a' and 'the value of item 1 is b'

console.log("");

// Part 2
console.log("Part 2");

var originalArray = [1, 2, 3];

function mirrorArr(arr) {
    var mirroredArr = [];
    for (var indx of arr) {
        mirroredArr.unshift(indx);
    }
    return mirroredArr;
} //We create an empty array, then cycle through the original array with a 'for ... of' loop, and unshift each element to the new

console.log("mirrorArr(originalArray) :", mirrorArr(originalArray));
console.log("originalArray :", originalArray); //We log the original array afterwards to make sure it hasn't been altered

console.log("");

// Part 3
console.log("Part 3");

var originalArray = [1, 2, -1, -90, 10];

function getLessThanZero(arr) {
    return arr.filter(function (indx) {
        return indx < 0; //The condition that the element must pass in the .filter method
    });
}

console.log("getLessThanZero(originalArray) :", getLessThanZero(originalArray));
console.log("originalArray :", originalArray);

console.log("");
