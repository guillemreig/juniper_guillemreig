// SETUP
const PORT = 8080; //Set the port to be used

const path = require("path"); // Require 'path'

const express = require("express"); // require express

const app = express(); // create a new instance of express

// Cookie parser
const cookieParser = require("cookie-parser"); // requiering cookie parser so that we can set cookies
app.use(require("cookie-parser")()); //pass cookie parser to app.use so that we can set and read cookies

const basicAuth = require("basic-auth");

// Handlebars setup
const { engine } = require("express-handlebars");
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// MIDLEWARE
// Cookie check
// app.use("/", (req, res, next) => {
//     console.log("req.url", req.url);
//     if (!req.cookies.consent) {
//         res.redirect("../cookie");
//     } else {
//         next();
//     }
// }); // Just logs req.url for debugging purposes

// app.use("/01_html", (req, res, next) => {
//     console.log("Checkpoint 2: cookie check");
//     if (!req.cookies.consent) {
//         res.redirect("../cookie");
//     } else {
//         next();
//     }
// });

// Basic Auth check
const auth = function (req, res, next) {
    console.log("Checkpoint 3: basic auth check");
    const creds = basicAuth(req);
    // if (req.url.includes("screenshot")) {
    //     next();
    //     return;
    // } else
    if (!creds || creds.name != "juniper" || creds.pass != "12345!") {
        res.setHeader("WWW-Authenticate", "Basic realm='Enter your credentials to see some magic'");
        res.sendStatus(401); // Unauthorised
    } else {
        next();
    }
};

// app.use("/04_connect4", auth); // Checks all url that include "/04_connect4" // REMOVE

// STATIC PATHS
app.use(express.static(path.join(__dirname, "projects")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/cookie", express.static(path.join(__dirname, "cookie")));

// SERVER BODY

const projectsData = require("./projects.json"); // require JSON data

// Main Page
app.get("/", (req, res) => {
    res.render(
        "welcome",
        {
            title: "Welcome page", // Assign 'Projects' to 'title' variable
            projectsData,
        } // Object
    );
});

// Description pages
app.get(`/:project/description`, (req, res) => {
    console.log("req.params.project :", req.params.project);

    const projectFound = projectsData.find((item) => item.directory == req.params.project);

    if (projectFound) {
        res.render(
            "description",
            {
                title: projectFound.name, // Assign 'Projects' to 'title' variable
                name: projectFound.name,
                directory: projectFound.directory,
                description: projectFound.description,
                projectsData,
            } // Object
        );
    } else {
        res.sendStatus(404);
    }
});

// For each loop version
// projectsData.forEach((item) => {
//     app.get(`/${item.directory}/description`, (req, res) => {
//         res.render(
//             "description",
//             {
//                 title: item.name, // Assign 'Projects' to 'title' variable
//                 name: item.name,
//                 directory: item.directory,
//                 description: item.description,
//             } // Object
//         );
//     });
// });

// Cookie accept
app.get("/accept", (req, res) => {
    res.cookie("consent", true);
    res.redirect("/");
});
// Cookie decline
app.get("/decline", (req, res) => {
    res.redirect("/");
});

// END INITIALIZATION
app.listen(PORT, () => {
    console.log(`Checkpoint 0: Listening on port: ${PORT}`);
});
