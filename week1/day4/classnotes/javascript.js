console.log();

// Arrays
// Arrays are objects that can be used to store lists of items.
// The items may be of any type and each one can be accessed using its index - its position in the array.

var arr = ["hello world", 90210, false, Math];

arr[0]; // 'hello world';
arr[1]; // 90210

// Arrays have a length property that indicates how many items are in the array.

var arr = ["hello world", 90210, false, Math];

arr.length; // 4

// Arrays can be missing elements. Such arrays are said to be sparse.

var arr = [];
arr[2] = 5;

console.log("sparse array :", arr); // [ , , 5 ]
console.log("arr.length :", arr.length); // 3
console.log("arr[0] :", arr[0]); // undefined

console.log();

// It is also possible to create arrays using the Array constructor.
// The parameters you pass to Array become elements of the array that is created unless you only pass one parameter,
// and that parameter is a number. In that case that parameter becomes the length of the array that is created.

var arr = new Array(5);

arr.length; // 5
console.log("arr :", arr);

// arr = new Array(-5); // error

console.log();

// Array methods

// .push()
// Adds elements to the end of an array.
// Returns the new .length of the array.

var gettysburgWords = ["four", "score"];

gettysburgWords.push("and"); // 3
gettysburgWords.push("seven", "years", "ago"); // 6

// .pop()
// Removes the last item.
// Returns the removed item.

var gettysburgWords = ["four", "score"];

var lastWord = gettysburgWords.pop();

lastWord; // 'score';

gettysburgWords.length; // 1

gettysburgWords[0]; // 'four'

// .unshift()
// Adds elements to the beginning of an array.
// Returns the new .length of the array.

var gettysburgWords = ["score"];

gettysburgWords.unshift("four"); // 2

gettysburgWords[0]; // 'four'
gettysburgWords[1]; // 'score'

// .shift()
// Removes the first element of the array.
// Returns the removed item.

var gettysburgWords = ["four", "score"];

var firstWord = gettysburgWords.shift();

firstWord; // 'four';
gettysburgWords.length; // 1
gettysburgWords[0]; // 'score'

// Both shift and pop return undefined if the array is empty.

// .splice
// Remove items from anywhere in an array.
// First parameter a number indicating the 'index at which to start removal'.
// The second parameter is the 'number of items to remove' and if none is specified 'all' of the elements after the index specified by the first parameter will be removed.
// Any additional parameters passed will be 'added to the array' starting at the index specified by the first parameter.
// Returns a 'new array' containing the elements that were removed.

var arr = [0, 1, 2, 3];

var removed = arr.splice(1, 2, "two items missing");

removed; // [1, 2]
removed[0]; // 1
removed[1]; // 2

arr; // [0, "two items missing", 3]
arr[0]; // 0
arr[1]; // 'two items missing'
arr[2]; // 3

console.log("arr :", arr);
console.log("removed :", removed);

console.log();

// .slice
// Takes a start index and an end index (not included!) as parameters and returns a 'new array' consisting of the specified elements.
// The array that slice is called on remains 'unchanged'.
// The start and end indexes can be 'negative numbers' to indicate positions from the end of the array.
// If there is no end index, 'all' of the items from the start index are in the returned array.
// If no parameters are passed to slice, a 'clone' of the array is returned.

var arr = [0, 1, 2, 3];

var sliced = arr.slice(1, 3); // The item at index 3 is not included
sliced; // [1, 2]

sliced = arr.slice(0, -1); // Negative numbers count from the end. Also not included
sliced; // [0, 1, 2];

sliced = arr.slice(3); // No second argument > clones all after index
sliced; // [3]

sliced = arr.slice();
sliced; // [0, 1, 2, 3]; // No arguments > clones the array

arr; // [0, 1, 2, 3]; // Original remains unchanged

sliced == arr; // false (even though they have the same contents, they are different entities!)

// Other useful methods

// .join()
// Converts the contents an array into a 'string' with each item separated by the delimitor specified as the first parameter.

const elements = ["Fire", "Air", "Water"];

elements.join(); // "Fire,Air,Water"
elements.join(""); // "FireAirWater"
elements.join("-"); // "Fire-Air-Water"

// .concat()
// Merges two or more arrays.
// This method does not change the existing arrays, but instead returns a new array.

var array1 = ["a", "b"];
var array2 = ["c", "d"];
var array3 = ["e", "f"];
var array4 = array1.concat(array2.concat(array3));

console.log(array4); // expected output: ["a", "b", "c", "d", "e", "f"]

// .reverse()
// Reverses an array in place and returns the reversed array.
// Careful: reverse is destructive -- it changes the original array!

var array1 = ["one", "two", "three"];

var reversed = array1.reverse(); // ["three", "two", "one"]

console.log("array1:", array1); // expected output: "array1:" ["three", "two", "one"]

// .sort()
// Sorts the array. By default, it sorts alphabetically.
// A function can be passed in to specify how the sorting should occur.

var monthsArr = ["March", "Jan", "Feb", "Dec"];
monthsArr.sort(); // ["Dec", "Feb", "Jan", "March"]

var numbersArr = [1, 30, 4, 21, 100000];
numbersArr.sort(); // [1, 100000, 21, 30, 4]

// .filter()
// Creates a shallow copy of a portion of a given array,
// filtered down to just the elements from the given array that pass the test implemented by the provided function.

let wordsArr = [
    "spray",
    "limit",
    "elite",
    "exuberant",
    "destruction",
    "present",
];

let filteredArr = wordsArr.filter((item) => item.length > 6);

filteredArr; // ["exuberant", "destruction", "present"]

// .map()
// Creates a new array populated with the results of calling a provided function on every element in the calling array.

var array1 = [1, 4, 9, 16];

var mapArr = array1.map((item) => item * 2); // pass a function to map

mapArr; // [2, 8, 18, 32]

// .some() and .every()
// returns true as soon as a single elements in the arrays passes a test contained in the callback that is passed in. If none pass, false is returned
