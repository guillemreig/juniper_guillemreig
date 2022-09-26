const http = require("http"); // Require 'http' module
const fs = require("fs"); // Require 'fs' module
const path = require("path"); // Require 'path' module

const generator = require("./generator");

const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
}; // Helps select correct content type for setHeader

const server = http.createServer((request, response) => {
    request.on("error", (error) => console.log("Error in request :", error));
    response.on("error", (error) => console.log("Error in response :", error));
    console.log("Checkpoint 1: createServer");

    // const filePath = __dirname + request.url;
    // const filePath = path.join(__dirname, request.url);

    const filePath = path.join(__dirname, "projects", request.url);
    const projectsRoot = path.join(__dirname, "projects");

    console.log("Checkpoint 2. filePath :", filePath);

    // Deny any method that is not GET
    if (request.method !== "GET") {
        response.statusCode = 400;
        response.end();
        return;
    } // end the process with 400

    if (request.url === "/") {
        console.log("HERE");
        // call homepage html generator function from external module
        generator.htmlGenerator(response, projectsRoot);
        response.end();
        return;
    }

    if (!filePath.startsWith(projectsRoot)) {
        response.statusCode = 403;
        return response.end();
    }

    if (!fs.existsSync(filePath)) {
        console.log("Checkpoint 3: !fs.existsSync(filePath)");

        response.statusCode = 404;
        response.end();
        return;
    } // If requested file does not exists, end the process with 404

    if (fs.statSync(filePath).isFile()) {
        console.log("Checkpoint 4: fs.statSync(filePath).isFile()");

        response.setHeader("content-type", contentTypes[path.extname(filePath)] || "text/html"); // If extname is undefined, default to html
        console.log("Checkpoint 5: path.extname(filePath)", path.extname(filePath));

        response.statusCode = 200;

        const readStream = fs.createReadStream(filePath); // Create a readStream
        console.log("Checkpoint 6; readStream");
        readStream.pipe(response); // Pipe it to response (write)

        readStream.on("end", () => {
            console.log("Checkpoint 7: readStream.on('end'");
            response.end();
            return;
        }); // We cannot end the process until the pipe command has finished
    }

    // if (fs.statSync(filePath).isDirectory()) {
    //     if (!filePath.endsWithWith("/")) {
    //         response.setHeader("Location", `${request.url}/`); // redirect
    //     }

    // redirect to index.html
    // }
});

server.listen(8080);
