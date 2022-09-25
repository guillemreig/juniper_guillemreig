// SETUP
const PORT = 8080; //Set the port to be used

const path = require("path");

const fs = require("fs");

// Express
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

// basic auth function
const auth = function (req, res, next) {
    const creds = basicAuth(req);
    if (!creds || creds.name != "juniper" || creds.pass != "12345!") {
        res.setHeader("WWW-Authenticate", "Basic realm='Enter your credentials to see some magic'");
        res.sendStatus(401); // Unauthorised
    } else {
        next();
    }
};

app.use("/01_html", (req, res, next) => {
    if (!req.cookies.consent) {
        console.log("req.url", req.url);
        res.redirect("../cookie");
    }
    next();
});

app.use("/04_connect4", auth); // Checks all url that include "/04_connect4"

// app.use(express.static(path.join(__dirname, "projects")));
app.use("/", express.static(path.join(__dirname, "projects")));
app.use("/cookie", express.static(path.join(__dirname, "cookie")));

// BODY
app.get("/", (req, res) => {
    const projectsData = require("./projects.json");
    res.render(
        "projects",
        {
            title: "Projects", // Assign 'Projects' to 'title' variable
            projectsHandlebars: projectsData,
        } // Object
    );
});

app.get("/accept", (req, res) => {
    res.cookie("consent", "true");
    res.redirect("/");
});

app.get("/decline", (req, res) => {
    res.redirect("/");
});

// END
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
