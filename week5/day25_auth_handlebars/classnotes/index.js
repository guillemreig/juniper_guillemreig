// SETUP
const PORT = 8080;

const express = require("express");

const app = express(); // just a give object giving us all sorts of methods

const { engine } = require("express-handlebars"); // Tell express to use handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// Require basci auth package
const basicAuth = require("basic-auth");

// MIDDLEWARE
const auth = function (req, res, next) {
    const creds = basicAuth(req);
    console.log("req.url :", req.url);
    if (req.url.includes("secret")) {
        if (!creds || creds.name != "juniper" || creds.pass != "12345!") {
            res.setHeader("WWW-Authenticate", "Basic realm='Enter your credentials to see some magic'");
            res.sendStatus(401); // Unauthorised
        } else {
            next();
        }
    } else {
        next();
    }
};

app.use(auth); // Version 1

// BODY
app.get("/", (req, res) => {
    // res.send("<h1>Hi there!</h1>");
    const people = require("./people.json");

    // Handlebars
    res.render("hello", {
        // Render 'hello' template
        title: "Hello", // Assign 'Hello' to 'title' variable
        people,
        name: "Juniper",
        animals: ["Cat", "Dog", "Rat"],
    }); // Render view 'hello'
    // res.render("hello", { layout: null }); // Don't use the default layout

    // build the screenshot url
    // <img src="<path tp project>/screenshot.png" alt="project screenshot" />
});

app.get("/about", (req, res) => {
    res.send("<h1>About me? Sure!</h1>");
});

app.get("/secret", (req, res) => {
    // auth(req, res); // Version 2
    res.send("<h1>This is the secret route!</h1>");
});

// END
app.listen(PORT, () => {
    console.log(`Do It! Just DO IT! 💪: ${PORT}`);
});
