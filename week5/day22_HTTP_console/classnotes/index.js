const http = require("http");
const PORT = 8080;

const fs = require("fs");
const path = require("path");

console.log("__dirname :", __dirname);

const server = http.createServer((request, response) => {
    request.on("error", (error) => console.log("Error in Request: ", error));
    response.on("error", (error) => console.log("Error in response: ", error));

    console.log("request method: ", request.method);
    console.log("request url: ", request.url);
    console.log("request headers: ", request.headers);

    const content = `${Date()}\t${request.method} \t${request.url}\t${request.headers["user-agent"]}\n`;

    fs.appendFileSync(`${__dirname}/requests.txt`, content);

    if (request.method === "GET" && request.url === "/requests.txt") {
        response.setHeader("content-type", "text/plain");
        response.statusCode = 200;
        // .pipe version
        // fs.createReadStream(`${__dirname}/requests.txt`).pipe(response);
        // .readfileSync version
        response.write(fs.readFileSync(`${__dirname}/requests.txt`));
    } else if (request.method === "GET" || request.method === "HEAD") {
        response.setHeader("content-type", "text/html");
        response.statusCode = 200;

        if (request.method === "GET") {
            response.write(`
                <!doctype html>
                    <html>
                        <title>Hello World!</title>
                        <p>Hello World!</p>
                    </html>
            `);
        }
    } else if (request.method === "POST") {
        // response.setHeader("Location", "/");
        // response.statusCode = 302;

        let body = "";
        request.on("data", (chunk) => {
            body += chunk;
        });

        request.on("end", function () {
            console.log("body :", body);
            response.end();
        });
    } else {
        response.statusCode = 405;
    }
    // response.end();
});

server.listen(PORT, () => console.log(`Hey I am listening on PORT:${PORT}`));
