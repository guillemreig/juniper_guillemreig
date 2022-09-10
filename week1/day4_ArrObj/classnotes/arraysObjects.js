console.log();

// ARRAYS

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

console.log();

// .reverse()
// Reverses an array in place and returns the reversed array.
// Careful: reverse is destructive -- it changes the original array!

var array1 = ["one", "two", "three"];

var reversed = array1.reverse(); // ["three", "two", "one"]

console.log("array1:", array1); // expected output: "array1:" ["three", "two", "one"]

console.log();

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
// returns 'true' as soon as a single element/all elements in the array pass a test contained in the callback that is passed in.

var array = [1, 2, 3, 4, 5];

console.log(array.some((element) => element % 2 === 0)); // expected output: true

var array1 = [1, 30, 39, 29, 10, 43];

console.log(array1.every((currentValue) => currentValue < 40)); // expected output: false

console.log();

// .indexOf()
// Returns the index of an item in an array.
// Second argument tells the method where to start searching.
// If the item appears in the array more than once then only the first index is returned.
// If the item is not in the array then -1 is returned.
// Note that === is used to test if the specified item is in the array.

var beasts = ["ant", "bison", "camel", "duck", "bison"];

beasts.indexOf("bison"); // expected output: 1
beasts.indexOf("giraffe"); // expected output: -1

// start from index 2
beasts.indexOf("bison", 2); // expected output: 4

// .lastIndexOf
// Like .indexOf() but returns the index of the last occuring match in the array instead of the first.

var animals = ["Dodo", "Tiger", "Penguin", "Dodo"];

animals.lastIndexOf("Dodo"); // expected output: 3
animals.lastIndexOf("Tiger"); // expected output: 1

// start from index 2
animals.lastIndexOf("Dodo", 2); // expected output: 0

// .forEach()
// Executes a provided function once for each array element. Leaves tge original array unchanged.

var array1 = ["a", "b", "c"];

array1.forEach((element) => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"

console.log(array1);

console.log();

// OBJECTS

// Objects are collections of properties. Properties have names (keys) and values.
// Property names can be any string (symbols can also be used, but they rarely are so we shall leave them out of consideration).
// If you wish to access a property using dot syntax, the name must begin with an alphabetic character, $, or _, and contain only those same characters and/or digits.
// Otherwise, you must access the property with square brackets and quotes.

var obj = {
    prop: 1,
    prop2: 2,
    $prop: 3,
    _prop: 4,
    "2*prop*!": 5,
};

obj.prop; //1
obj.prop2; //2
obj.$prop; //3
obj._prop; //4
obj["2*prop*!"]; //5

// The 'in' operator
// When you access a property of an object that does not exist, the value that is returned is undefined.

var obj = {};
obj.prop; //undefined

// Of course, a property can exist and have undefined as its value.
// To test whether a property exists on an object, you can use the in operator.

var obj = {
    prop: undefined,
};

obj.prop; //undefined
obj.prop2; //undefined

"prop" in obj; //true
"prop2" in obj; //false

// The 'delete' operator
// To remove a property from an object, you can use the delete operator.
// An expression with the delete operator will return true if the property can be deleted and false if it cannot.

var obj = {
    prop: "whatever",
};

delete obj.prop; //true

// Creating objects
// Javascript provides multiple ways to create objects. The examples above all use literal syntax.
// It is also possible to create an object using the Object constructor but there is no advantage to doing so.

var obj1 = {};
var obj2 = Object();
var obj3 = new Object();

obj1; //{}
obj2; //{}
obj3; //{}

// Another way to create objects is to use the Object.create method.

var obj = Object.create(null);

obj; //{}

// The Object.create method accepts two parameters.
// The first is an object that is to serve as the prototype of the object you are creating (if you do not want your object to have a prototype you can pass null).
// The second parameter is a property descriptor - an object that describes properties of the object you are creating.
// A new object with 'null' prototype can behave in unexpected ways, because it doesn't inherit any object methods from Object.prototype.

const person = {
    isHuman: false,
    printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
    },
};

const me = Object.create(person);

me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntroduction(); // expected output: "My name is Matthew. Am I human? true"

// Prototype
// A prototype is an object that another object inherits properties from.
// When you access a property on an object, if that property is not found, the property is then looked for in the prototype.

var proto = {
    prop: "whatever",
};

var obj = Object.create(proto);

obj.prop; //'whatever'

// An object can have properties that have the same name as properties of its prototype. This is called overriding.

var obj = Object.create(proto);
obj.prop = "not whatever";

obj.prop; //'not whatever'

delete obj.prop;

obj.prop; //'whatever'

// Property descriptor
// A property descriptor is an object that describes a property.

var obj = Object.create(null, {
    city: {
        value: "Berlin",
    },
});

// There are specific attributes that can be used in a property descriptor:

// value - the value of the property
// writable - a boolean indicating whether the property can be set to a new value. The default is false
// configurable - a boolean indicating whether the descriptor for the property can be changed and whether the property can be deleted. The default is false
// enumerable - a boolean indicating whether the property should appear when the object's properties are enumerated (as with a for...in loop). The default is false.
// get - a function to be run when the property is accessed. The value returned from the function is used as the property value
// set - a function to be run when the property is set

delete obj.city; //false (error in strict mode)

obj.city = "Dallas"; //error in strict mode

obj.city; //'Berlin'

for (var prop in obj) {
    console.log(prop); //'city' is not logged
}

// Note that these defaults are not used when you create a property by directly setting it on an object.

var obj = {
    city: "Berlin",
};

obj.country = "Germany";

delete obj.city; //true

obj.country = "Canada";

obj.country; //'Canada'

for (var prop in obj) {
    console.log(prop); //'country' is logged
}

// Properties inherited from Object.prototype
// Objects inherit a number of properties that do not show up in for..in loops because they are not enumerable.
// Four particularly important properties that all objects inherit are:

// constructor - The function used to construct the object. For objects created using literal syntax the constructor is Object.
// hasOwnProperty - Returns a boolean indicating whether the specified property exists directly on the object or not.
// toString - Returns a string represenation of the object. This method is automatically called when the object is coerced to a string. By default this method returns '[object Object]'.
// valueOf - This method is automatically called when an object is coerced to a primitive value. By default this method returns the object itself.
