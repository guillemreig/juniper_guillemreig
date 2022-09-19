const fs = require("fs");
const path = require("path");

// Part 1
// Callback version (items listed without order)
// function logSizes(dirPath) {
//     // 1st. read from the directory
//     fs.readdir(dirPath, { withFileTypes: true }, (err, dirContents) => {
//         // 2nd. Execute a function
//         if (err) {
//             console.log(err);
//             return;
//         } // If error, log the error and exit the function
//         // 3rd. Loop through contents and execute one thing or another depending of the type
//         for (let item of dirContents) {
//             if (item.isFile()) {
//                 // 4th.a. Just log the path and the size of the file
//                 let filePath = path.join(dirPath, item.name);
//                 let fileInfo = fs.statSync(filePath);
//                 console.log("📄", filePath, fileInfo.size);
//             } else if (item.isDirectory()) {
//                 // 4th.b. If folder, call the function again so it can read that folder's contents too
//                 let folderPath = path.join(dirPath, item.name);
//                 // console.log("📁", item.name);
//                 logSizes(folderPath);
//             }
//         }
//     });
// }

// Syncronous version (items listed in order)
function logSizes(dirPath) {
    try {
        dirContents = fs.readdirSync(dirPath, { withFileTypes: true });

        for (let item of dirContents) {
            if (item.isFile()) {
                let filePath = path.join(dirPath, item.name);
                let fileInfo = fs.statSync(filePath);
                console.log("📄", filePath, fileInfo.size);
            } else if (item.isDirectory()) {
                let folderPath = path.join(dirPath, item.name);
                console.log("📁", item.name);
                logSizes(folderPath);
            }
        }
    } catch (err) {
        console.log(err);
        return;
    }
}

const fileDirPath = path.join(__dirname, "files");

logSizes(fileDirPath); // __dirname is always the same
