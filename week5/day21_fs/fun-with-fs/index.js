const fs = require("fs");
const path = require("path");

const filesDirPath = path.join(__dirname, "files");

// Part 1
// Callback version (items listed without order)
function logSizes(dirPath) {
    // 1st. read the directory
    fs.readdir(dirPath, { withFileTypes: true }, (err, dirContents) => {
        // 2nd. Execute a function
        if (err) {
            console.log(err);
            return;
        } // If error, log the error and exit the function
        // 3rd. Loop through contents and execute one thing or another depending of the type
        for (let item of dirContents) {
            let filePath = path.join(dirPath, item.name); // 1st. Get item path

            if (item.isFile()) {
                // 4th.a. Just log the path and the size of the file
                let fileInfo = fs.statSync(filePath); // 2nd. Get info about file
                console.log("📄", filePath, fileInfo.size);
            } else if (item.isDirectory()) {
                // 4th.b. If folder, call the function again so it can read that folder's contents too
                console.log("📁", item.name);
                logSizes(filePath);
            }
        }
    });
}

// Syncronous version (items listed in order)

// function logSizes(dirPath) {
//     try {
//         dirContents = fs.readdirSync(dirPath, { withFileTypes: true }); // Array

//         for (let item of dirContents) {
//             if (item.name[0] == ".") {
//                 // Used to ignore annoying MacBook files
//             } else if (item.isFile()) {
//                 let filePath = path.join(dirPath, item.name); // Gets the item path
//                 let fileInfo = fs.statSync(filePath);
//                 console.log("📄", filePath, fileInfo.size);
//             } else if (item.isDirectory()) {
//                 let folderPath = path.join(dirPath, item.name);
//                 console.log("📁", item.name);
//                 logSizes(folderPath);
//             }
//         }
//     } catch (err) {
//         console.log(err);
//         return;
//     }
// }

logSizes(filesDirPath);

// Part 2
// 2a.
// function mapSizes(dirPath) {
//     try {
//         dirContents = fs.readdirSync(dirPath, { withFileTypes: true });
//         const itemObj = {};
//         for (let item of dirContents) {
//             if (item.name[0] == ".") {
//                 // Used to ignore annoying MacBook files
//             } else if (item.isFile()) {
//                 let filePath = path.join(dirPath, item.name);
//                 let fileInfo = fs.statSync(filePath);
//                 itemObj[item.name] = fileInfo.size;
//             } else if (item.isDirectory()) {
//                 let folderPath = path.join(dirPath, item.name);
//                 itemObj[item.name] = mapSizes(folderPath);
//             }
//         }
//         return itemObj;
//     } catch (err) {
//         console.log(err);
//         return;
//     }
// }

// const dirObj = mapSizes(filesDirPath);
// // console.log("dirObj :", dirObj);

// // 2b.
// var jsonObj = JSON.stringify(dirObj, null, 4);
// console.log(jsonObj);

// fs.writeFileSync(`${__dirname}/files.json`, jsonObj);

// // Part 3

// (function mapSizesAsync(dirPath) {
//     dirContents = fs.readdir(dirPath, { withFileTypes: true }, (err, dirContents) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         const itemObj = {};
//         for (let item of dirContents) {
//             if (item.name[0] == ".") {
//             } else if (item.isFile()) {
//                 let filePath = path.join(dirPath, item.name);
//                 let fileInfo = fs.statSync(filePath);
//                 itemObj[item.name] = fileInfo.size;
//             } else if (item.isDirectory()) {
//                 let folderPath = path.join(dirPath, item.name);
//                 itemObj[item.name] = mapSizes(folderPath);
//             }
//         }
//         console.log("itemObj :", itemObj); // Needs to be inside the function because the callback is asyncronous
//         return;
//     });
// })(filesDirPath);
