// Promise Constructor

var myPromise = new Promise(function (resolve, reject) {
    if (Math.random() > 0.5) {
        resolve("Success!");
    } else {
        reject("Failure!");
    }
})
    .then(function (response) {
        console.log(".then :", response); //logs "It's your lucky day."
    })
    .catch(function (error) {
        console.log(".catch :", error); //logs "You lose. You get nothing."
    });

// Promisify

const fs = require("fs");
const util = require("util");

const readdir = util.promisify(fs.readdir);

readdir(__dirname)
    .then(function (files) {
        console.log("files :", files); // do something with list of items in the directory
    })
    .catch(function (error) {
        console.log("error :", error); // handle error
    });

// myPromise
//     .then((result1) => {
//         console.log("result1 :", result1);
//         result1 = "Great " + result1;
//         return result1;
//     })
//     .then((result2) => {
//         console.log("result2 :", result2);
//     })
//     .catch((error) => {
//         console.log("error :", error);
//     });

// promisified version of an asynchronous function

// var fs = require("fs");
// var { readdir } = require("fs");

// function readdir(path) {
//     return new Promise(function (resolve, reject) {
//         fs.readdir(path, function (error, files) {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(files);
//             }
//         });
//     });
// }

// readdir(__dirname);

// var { promisify } = require("util");
// var readdirPromise = promisify(readdir);

// console.log("After the promise");

//

// readdir(__dirname, function (error, files) {
//     if (!error) {
//         console.log('files.join(", ") :', files.join(", "));
//     }
// });

// readdirPromise(__dirname).then((result) => {
//     console.log("promise based:", result.join(", "));
// });

// function delay(miliseconds) {
//     setTimeout((resolve) => resolve("Hello!"), miliseconds);
// }

// delay(1000)
//     .then((result) => {
//         console.log("result:", result);
//         throw new Error("Some error!");
//     })
//     .catch((error) => {
//         console.log("error:", error);
//     })
//     .finally(() => {
//         console.log("Finally!");
//     });

// //

// const promise1 = delay(1000);
// const promise2 = delay(2000);

// Promise.all([promise1, promise2]).then((result) => {
//     console.log("promise all results: ", result);
// });

const multiArr = [
    [1, 2],
    [3, 4],
];

console.log(multiArr.flat()); // [1, 2, 3, 4]

const unsortArr = [4, 5, 2, 3, 1];

const sortedArr = unsortArr.sort((a, b) => {
    // return a - b; // [ 1, 2, 3, 4, 5 ]
    return b - a; // [ 5, 4, 3, 2, 1 ]

    if (a > b) {
        return 1; // positive value
    } else if (a < b) {
        return -1; // negative value
    }
});

console.log(sortedArr);

console.log(new Date());
