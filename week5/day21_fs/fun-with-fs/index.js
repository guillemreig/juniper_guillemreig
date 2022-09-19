const fs = require("fs");
const path = require("path");

// Part 1
function logSizes(dirPath) {
    fs.readdir(dirPath, { withFileTypes: true }, (err, dirContents) => {
        if (err) {
            console.log(err);
            return;
        }

        for (let item of dirContents) {
            if (item.isFile()) {
                let filePath = path.join(dirPath, item.name);
                let fileInfo = fs.statSync(filePath);
                console.log("📄", filePath, fileInfo.size);
            } else if (item.isDirectory()) {
                let folderPath = path.join(dirPath, item.name);
                logSizes(folderPath);
            }
        }
    });
}

const fileDirPath = path.join(__dirname, "files");

logSizes(fileDirPath); // __dirname is always the same
