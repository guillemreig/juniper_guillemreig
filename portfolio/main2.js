// SETUP
const PORT = 8080; //Set the port to be used

const path = require("path");

const fs = require("fs");

// Express
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const basicAuth = require("basic-auth");

// Handlebars setup
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// MAIN GENERATOR
// function mainGenerator(res, dirPath) {
//     dirContents = fs.readdirSync(dirPath, { withFileTypes: true });
//     console.log(dirContents);

//     let ulContents = "";

//     for (let item of dirContents) {
//         // let projectPath = path.join(item.name);
//         item.name[0] !== "." && (ulContents += `<li><a href="${item.name}">${item.name}</a></li>`);
//     }

//     res.send(
//         `<!DOCTYPE html>
//             <html lang="en">
//                 <head>
//                     <meta charset="UTF-8" />
//                     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//                     <title>Projects</title>
//                     <!-- <link rel="stylesheet" href="style.css" /> -->
//                 </head>
//                 <body>
//                     <div class="projects-info">
//                         <ul>
//                             ${ulContents}
//                         </ul>
//                     </div>
//                     <script src="https://code.jquery.com/jquery-3.6.1.js"></script>
//                 </body>
//             </html>`
//     );
// }

// MIDLEWARE
app.use(require("cookie-parser")());

const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!creds || creds.name != "juniper" || creds.pass != "12345!") {
        res.setHeader("WWW-Authenticate", "Basic realm='Enter your credentials to see some magic'");
        res.sendStatus(401); // Unauthorised
    } else {
        next();
    }
};

app.use("/04_connect4", auth); // Checks all url that include "/04_connect4"

app.use(express.static(path.join(__dirname, "projects")));

// BODY
app.get("/", (req, res) => {
    // res.cookie("isExpressGreat", true);
    // const projectsRoot = path.join(__dirname, "projects");
    //  mainGenerator(res, projectsRoot);

    // dirContents = fs.readdirSync(projectsRoot, { withFileTypes: true });
    // projects = dirContents;

    // console.log(dirContents);
    // console.log(projects);

    const projectsData = require("./projects.json");

    res.render(
        "projects",
        {
            title: "Projects", // Assign 'Projects' to 'title' variable
            projectsHandlebars: projectsData,
        } // Object
    );
});

// END
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
