// Constructors
// Constructors are functions that, when called with the new keyword, return a newly created object (an instance).
// By convention, the names of constructors begin with capital letters.

function Country(name) {
    this.name = name;
}

var germany = new Country("Germany");

// When a constructor is called with new, this in the body of the constructor function refers to the newly created object that will be returned.

// No return statement is necessary since the newly created object will be returned automatically.
// However, a return statement that returns a different object will be effective.

function Country(name) {
    this.name = name;
    return {};
}

var germany = new Country("Germany"); //{} (and not { name: 'Germany' })

// If a constructor is called with new and without any parameters passed in, it is not necessary to use parentheses.
// The presence of new is enough to make it clear that the function is being invoked and not merely accessed.
// However, parentheses are required if you wish to immediately access one of the newly created object's properties.

var date = new Date(); //no parentheses needed

var time = new Date().getTime(); //parentheses are needed

// Prototypes
// Every function automatically has a prototype property whose value is an object with no enumerable properties.
// When a function is called with new, the function's prototype property becomes the prototype of the object that the function returns.

function GermanCity(name) {
    this.name = name;
}

GermanCity.prototype.country = "Germany";

var berlin = new GermanCity("Berlin");
var hamburg = new GermanCity("Hamburg");

berlin.country; //'Germany'
hamburg.country; //'Germany'

// Note that the connection between instances and their prototype is 'live'.
// Changes to the properties of the prototype are immediately visible when those properties are accessed via the instances.

GermanCity.prototype.country = "Deutschland";

berlin.country; //'Deutschland'
hamburg.country; //'Deutschland'

// The prototype objects that are automatically attached to functions have an unenumerable property named constructor
// whose value is the function to which the prototype is attached.
// If you overwrite a constructor's prototype property with a new object that doesn't have a constructor property, instances will lose the reference to their constructor.

berlin.constructor; //GermanCity

GermanCity.prototype = {};

var munich = new GermanCity("Munich");

munich.constructor; //Object

// Prototypes are themselves objects that have other objects as their prototypes.
// The default object that is automatically assigned to a function's prototype property has Object.prototype as its prototype.

// The 'instanceof' operator
// The instanceof operator is used to test whether a given constructor exists as a constructor property of any of the prototypes in an object's prototype chain.

var date = new Date();

date instanceof Date; //true

date instanceof Object; //true

date instanceof Array; //false

// If you would like to make a constructor that can be called without new and still return an instance, the instanceof operator can help with that.

function Country(name) {
    if (!(this instanceof Country)) {
        return new Country(name);
    }
    this.name = name;
}

var country = Country("Germany");

country instanceof Country; //true

// This
// When a function that is a property of an object is called by referencing the function as a property of that object, this in the function body refers to the object to which the function belongs.

var nyc = {
    nickname: "the Big Apple",
    welcomeTo: function () {
        console.log("Welcome to " + this.nickname);
    },
};

nyc.welcomeTo(); //logs 'Welcome to the Big Apple'

nyc["welcomeTo"](); //logs 'Welcome to the Big Apple'

// This is the case even if the function is a property of a prototype that the object is inheriting properties from.

function City(nickname) {
    this.nickname = nickname;
}

City.prototype.welcomeTo = function () {
    console.log("Welcome to " + this.nickname);
};

new City("the Big Apple").welcomeTo(); //logs 'Welcome to the Big Apple'

// But if you call the exact same function without referencing it as a property of the object, you get quite a different result.

var nyc = {
    nickname: "the Big Apple",
    welcomeTo: function () {
        console.log("Welcome to " + this.nickname);
    },
};

var fn = nyc.welcomeTo;

fn(); //logs 'Welcome to undefined' if not in strict mode. In strict mode an error is thrown

// The value that this refers to within a function is determined when the function is called (in this way, this is like a parameter).
// In the example above, the function is not called as a property of an object. In such cases the value that this refers to is the global object.

// It is frequently the case that you want to define a function in a scope and have this in that function refer to the same thing it refers to in the scope in which that function is defined.
// A standard way to accomplish this is to stick the value of this in a variable that will be accessible to the nested function.

function City(nickname) {
    this.nickname = nickname;
}

City.prototype.welcomeTo = function () {
    console.log("Welcome to " + this.nickname);
};

City.prototype.waitThenWelcomeTo = function () {
    var city = this;
    setTimeout(function () {
        city.welcomeTo();
    }, 1000);
};

new City("the Big Apple").waitThenWelcomeTo(); //logs 'Welcome to the Big Apple' after 1 second

// Arrow functions automatically have the this value from their parent scope available to them.

City.prototype.waitThenWelcomeTo = function () {
    setTimeout(() => {
        this.welcomeTo();
    }, 1000);
};

new City("the Big Apple").waitThenWelcomeTo(); //logs 'Welcome to the Big Apple' after 1 second

// Another approach is to use the bind method, which all functions inherit from their prototype.

City.prototype.waitThenWelcomeTo = function () {
    setTimeout(
        function () {
            this.welcomeTo();
        }.bind(this),
        1000
    );
};

new City("the Big Apple").waitThenWelcomeTo(); //logs 'Welcome to the Big Apple' after 1 second

// 'call' and 'apply'
// The call and apply methods allow you to call a function with a this that you specify.
// The first argument to both methods is the object you would like this to refer to in the function call.
// call takes any number of other arguments which will all be passed to the function.
// apply allows you to use an array containing all the arguments to pass.

var batman = {
    name: "Batman",
    sayHi: function (name1, name2) {
        console.log(
            "Hello " +
                name1 +
                " and " +
                name2 +
                ". My name is " +
                this.name +
                "."
        );
    },
};

batman.sayHi("Janet", "Joe"); //logs 'Hello Janet and Joe. My name is Batman.'

batman.sayHi.call({ name: "Hello Kitty" }, "Brad", "Angelina"); //logs 'Hello Brad and Angelina. My name is Hello Kitty.'
// Syntax: call(thisArg, arg1, /* …, */ argN);

batman.sayHi.apply({ name: "Cher" }, ["Alan", "Alexa"]); //logs 'Hello Alan and Alexa. My name is Cher.'
// Syntax: apply(thisArg, argsArray);
