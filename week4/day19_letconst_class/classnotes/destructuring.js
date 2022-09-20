// let & const

var flavor = "chocolate";

function max(array) {
    var currentMax;
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (item > currentMax) {
            currentMax = item;
        }
    }
    return item;
}

console.log("max(2, 3, 10, -8) :", max(2, 3, 10, -8));

// caniuse.com to check % compatibility of a feature among browsers

// String literals

console.log();

const message = "Thank you for attending our event\nWe hope you had an enjoyable time\nSincerely, Our Team";
console.log(message + "\n");

const message2 = `Thank you for attending our event 
We hope you had an enjoyable time 
Sincerely, Our Team`;
console.log(message2 + "\n");

const color = "pink";
const gears = 22;
const wheelSize = 28;
const basketFront = true;

const message3 = `A ${color} bike with ${gears} gears, wheel size of ${wheelSize}, ${basketFront ? "with" : "without"} a basket front.`;
console.log(message3 + "\n");

function max(a, b) {
    if (a > b) {
        return a;
    }
    return b;
}

const numA = -2;
const numB = 1;
const message4 = `Between ${numA} and ${numB}, ${max(numA, numB)} is bigger.`;
console.log(message4 + "\n");

// Regular function
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}
sayHello("Guillem");

// Function expression
const sayBye = function (name) {
    console.log(`Goodbye, ${name}!`);
};
sayBye("Guillem");

// Arrow function
// uses an arrow => in its definition

// Long form
const sayGood = (name) => {
    console.log(`Good job, ${name}!`);
};
sayGood("Guillem");

console.log(typeof sayGood); // function

// Compact setTimeout syntax
setTimeout(() => {
    console.log("Time is up!");
}, 1000);

// Compact form
const dinasourize = (text) => `🦕${text}🦖`;
const multiply = (a, b) => a * b;

// Arrow functions and .this
// Regular functions introduce a new scope. 'this' refers to that new scope. Arrow functions do not create a new scope.

const stegosaurus = {
    name: "Stephan",
    waitThenEat: function () {
        console.log(`Hi! My name is ${this.name}, and I'm about to eat.`);
        setTimeout(() => {
            console.log(`Hi! My name is ${this.name}, and I'm eating!`);
        }, 1000);
    },
};

stegosaurus.waitThenEat();

// Classes

class Rectangle {
    constructor(w, h) {
        this.width = w;
        this.height = h;
    }
    getArea() {
        return this.width * this.height;
    }
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

class Square extends Rectangle {
    static amount = 0;

    constructor(length) {
        super(length, length); // 'super' calls the constructor of the parent
        this.amount++;
    }
} // with 'extends' Square inherits everything from Rectangle (parent object), including the constructor, so we use it

const r = new Rectangle(6, 4);
const s = new Square(5);

console.log("r :", r);
console.log("s :", s);

console.log("r.getArea() :", r.getArea());
console.log("r.getPerimeter() :", r.getPerimeter());

console.log("s.getArea() :", s.getArea());
console.log("s.getPerimeter() :", s.getPerimeter());

console.log(Rectangle.getObjectType);

console.log(Square.amount);

// Destructuring //

// Arrays

// Array items to variables
const arr = [1, 2, 3, 4, 5, 6];

const [a, b, , c, ...d] = arr; // You can quickly assign multiple array items to variables by placing each variable to its respective item position.
// You can skip items with empty ',', and place the remaining items to a single variable with '...'

console.log(a); // 1
console.log(b); // 2
console.log(c); // 4
console.log(d); // [5, 6]

// Expand arrays
const firstArr = [1, 2, 3];

const secondArr = [0, ...arr, 4];

secondArr; // [0, 1, 2, 3, 4]

// Array items as function arguments
function add([a, b]) {
    return a + b;
} // You can pass an array as a function argument and make the function use its items

console.log(add([3, 4])); // 7

// Array references
const arr1 = [1, 2, 3];
const arr2 = arr1; // This does not create a copy. It creates a new reference to the same array
arr1 == arr2; // true

arr1.push(4);
console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3, 4]
// Any actions applied to arr1 will affect arr2, as they refer to the same array

// Clone an array (truly)
const arr3 = [1, 2, 3];
const arr4 = [...arr3]; // This is a cloned array.
arr3 == arr4; // false

// Objects //

// Properties to variables
const person = {
    name: "Sven",
    age: 47,
    city: "Berlin",
    // country: "Germany",
};

const { name, age: num, ...rest } = person; // You can quickly assign property values to variables by using their name as variable name, or placing the variable a a property value
// You can use '...' to asign the remaining object to a variable

console.log(name); // Sven
console.log(num); // 47
console.log(rest); // {age: 47, city: 'Berlin', country: 'Germany'}

// We can create object properties from variables
const firstName = "Leonardo DiCaprio";
const oscars = 1;
const age = 43;

const leo = {
    firstName: firstName,
    oscars: oscars,
    age: age,
};

//

const person2 = {
    name: "Anna",
    ...person,
    country: "Germany",
};

console.log("person2", person2);

// Miscelaneous
function getNamedObject(name) {
    return {
        name, // We don't need to write name: name, because they have the same name
    };
}

function getObjectWithProperty(propertyName, propertyValue) {
    /*
    const obj = {};

    obj[propertyName] = propertyValue;
    return obj;
    */
    return {
        [propertyName]: propertyValue,
    };
}
