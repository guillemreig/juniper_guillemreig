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

document.writeln("r.getArea() :", r.getArea());
document.writeln("r.getPerimeter() :", r.getPerimeter());

document.writeln("s.getArea() :", s.getArea());
document.writeln("s.getPerimeter() :", s.getPerimeter());

document.writeln(Rectangle.getObjectType);

document.writeln(Square.amount);

// Destructuring

const arr = [11, 22, 33, 44, 55, 66];

const [a, b, , c, ...d] = arr; //

document.writeln(a); // 11
document.writeln(b); // 22
document.writeln(c); // 44
document.writeln(d); // 55,66

function add([a, b]) {
    return a + b;
}

console.log(add([3, 4])); // 7

const person = {
    name: "Sven",
    age: 47,
    city: "Berlin",
};

const { name, ...rest } = person;

console.log(name); // Sven
console.log(rest); // {age: 47, city: 'Berlin'}

const person2 = {
    name: "Anna",
    ...person,
    country: "Germany",
};

console.log(person2);

// Array references

const arr1 = [1, 2, 3];

const arr2 = arr1; // This does not create a copy. It creates a new reference to the same array

arr1.push(4);

console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3, 4]
// arr1 and arr2 variable names refer to the same array

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
