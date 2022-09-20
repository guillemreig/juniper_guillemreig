const fs = require("fs");
const path = require("path");

console.log("We are in " + __dirname);

// console.log("Let's run this file: ", `${__dirname}/setup.sh`);

///// Write to a file

// 1. syncronously
fs.writeFileSync(`${__dirname}/hello.txt`, "Hello, juniper!");

// 2. using a 'callback'
let filePath = `${__dirname}/hello-calback.txt`;
const message = "Hello, callback!";

fs.writeFile(filePath, message, (err) => {
    if (err) {
        console.log("I couldn't write to the file.");
        return;
    }
    console.log("We wrote to the callback file."); // We must put inside the callback, otherwise it would log before its time
}); // 3rd argument is a CALLBACK function; will be called once the writing is done (or if there is an error)

///// Read from a file

// 1. syncronously
filePath = path.join(__dirname, "hello.txt"); // Adapts path to mac or windows style

let contents = fs.readFileSync(filePath, "utf-8");

console.log("[sync] The file contains: ", contents);

// 2. callback
fs.readFile(filePath, "utf-8", (err, contents) => {
    if (err) {
        console.log("There was an error!");
        return;
    }
    console.log("[callback] The file contains: ", contents);
});

// Read metadata about a file ('stat')

// 1. syncronously
const fileInfo = fs.statSync(filePath);

console.log("Info about my txt file:", fileInfo);
console.log("Size of my txt file:", fileInfo.size);
console.log("Is it a directory?", fileInfo.isDirectory());

// 2. callback
fs.stat(filePath, (err, fileInfo) => {
    if (err) {
        console.log("There was an error!");
        return;
    }
    console.log("[callback] Info about my txt file:", fileInfo);
    console.log("[callback] Size of my txt file:", fileInfo.size);
    console.log("[callback] Is it a directory?", fileInfo.isDirectory());
});

// Read the contents of a dirextory

// 1. syncronously

let dirPath = path.join(__dirname, "test");

const dirContents = fs.readdirSync(dirPath);
console.log(dirContents);

// 2. callback
// Simple way
// fs.readdir(dirPath, (err, dirContents) => {
//     if (err) {
//         console.log("There was an error!");
//         console.log(err);
//         return;
//     }

//     console.log(dirContents); // Array-like

//     for (let item of dirContents) {
//         console.log(`${item} -`, typeof item);
//     }
// });

// Advanced way
function crawl(dirPath) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, dirContents) => {
        if (err) {
            console.log("There was an error!");
            console.log(err);
            return;
        }

        console.log(dirContents); // Array-like

        for (let item of dirContents) {
            if (item.isFile()) {
                console.log("📄", item.name);
            } else if (item.isDirectory()) {
                console.log("📁", item.name);
                crawl(path.join(dirPath, item.name));
            }
        }
    });
}
crawl(dirPath);
