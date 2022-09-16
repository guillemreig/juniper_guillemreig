// Require
// For a module to use another module, it must first include or import it with a call to the global function require.
const math = require("./math"); // Requires math module
console.log("math :", math);

const PI = require("./math").PI; // Requires PI value from .math as local variable PI
//const { PI } = require("./math"); // Destructuring assignment version
console.log(PI);

console.log(math.isEven(9));
console.log(math.isEven(8));
console.log(math.isOdd(7));

// Once a module is required by another module, all other calls to require it return the exact same object that the first one did.
// Every module is initialized only once.

const url = require("url");
require("url") == url; //true

const address = "https://spiced.space/juniper/schedule#current-week";

console.log(url.parse(address)); // Url { ... }

// Modules that come with Node can be included simply by passing their name to require.
// Modules that you install into your project with npm install can also be required in this manner

console.log(Math.pow(3, 3)); // To the power of three

const querystring = require("querystring");

console.log(querystring.parse("scroll=infinite&name=susan")); // [Object: null prototype] { scroll: 'infinite', name: 'susan' }

// The 'process' module
// 'process' provides information about the current Node process that is running.
// The 'process' module is special in that you do not have to require it to use it - it is available as a global.

// For example, its argv property gives you access to the arguments that were used to start the process.

console.log("arguments :", process.argv); // arguments : [ ... ]
console.log(`process.argv[0] is : ${process.argv[0]}`); // /usr/local/bin/node

// and its env property gives you access to the current environment variables.

// NPM library
