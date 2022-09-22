// SETUP
const PORT = 8080;

const path = require("path");

const fs = require("fs");

const express = require("express");
const app = express();

// MAIN GENERATOR

function mainGenerator(res, dirPath) {
    dirContents = fs.readdirSync(dirPath, { withFileTypes: true });

    let ulContents = "";

    for (let item of dirContents) {
        let projectPath = path.join(item.name);
        item.name[0] !== "." && (ulContents += `<li><a href="${projectPath}">${item.name}</a></li>`);
    }

    res.send(
        `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Projects</title>
                    <!-- <link rel="stylesheet" href="style.css" /> -->
                </head>
                <body>
                    <div class="projects-info">
                        <ul>
                            ${ulContents}
                        </ul>
                    </div>
                    <script src="https://code.jquery.com/jquery-3.6.1.js"></script>
                </body>
            </html>`
    );
}

// MIDLEWARE

app.use((req, res, next) => {
    console.log(req.url);
    if (req.url[1] == 0) {
        projectPath = path.join(__dirname, "projects", req.url);
        console.log("projectPath:", projectPath);
        res.sendFile(path.join(projectPath, "index.html"));
        app.use(express.static(projectPath));
    }
    next();
});

// BODY

app.get("/", (req, res) => {
    const projectsRoot = path.join(__dirname, "projects");
    mainGenerator(res, projectsRoot);
});

// app.get("/01_html", (req, res) => {
//     projectPath = path.join(__dirname, "projects", req.url);
//     res.sendFile(path.join(projectPath, "index.html"));
//     // , path.join(projectPath, "style.css"), path.join(projectPath, "script.js")
// });

// END
app.listen(PORT, () => {
    console.log(`Express project listening on port: ${PORT}`);
});
