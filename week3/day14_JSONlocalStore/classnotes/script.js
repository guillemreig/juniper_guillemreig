var newObj = {
    name: "Guillem",
};

var jsonObj = JSON.stringify(newObj);

console.log(jsonObj);

var jsonNewOb = { name: "Mila" };

console.log(jsonNewOb);

JSON.parse(jsonNewOb);

// In JSON we can have:
// strings
// numbers
// booleans

// We can't have:
// functions
// undefined
// comments

// JSON.stringify -- JS to JSON

var cohort = {};

var jsonCohort = JSON.stringify();

// Let's try to convert from JSON to JS a JS object
// var canIdoIt = JSON.parse(cohort); // This would give an error and stop the program

try {
    console.log("Inside the try");
    var canIdoIt = JSON.parse(cohort); // This is what it tries. It either succeds (continue) or fails (error)
    console.log("Still inside the try"); // This will run if there is no error
} catch (error) {
    console.log("error :", error); // Part inside the catch only runs if there is an error
} finally {
    console.log("I am going to run always"); // This will run aways
}

console.log("I'm here!");

// Save and load data to the local storage for future use
localStorage.setItem("item name", "This is a test string to store"); // Save a item

var test = localStorage.getItem("item name"); // Load item

console.log("item name :", test);

localStorage.removeItem("item name"); // This deletes the item

// Save 'cohort' object to local storage
var jsonCohort = JSON.stringify(cohort); // First convert to JSON

localStorage.setItem("cohort", jsonCohort); // Save string to local storage

// Load 'cohort' json string from local storage
var cohortFromLS = localStorage.getItem("cohort"); // Load JSON string from local storage

var backToJs = JSON.parse(cohortFromLS); // Convert to javascript
