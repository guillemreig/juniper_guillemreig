const express = require("express");
const app = express();
const hb = require("express-handlebars");

const teachers = require("./teachers.json");
const students = require("./students.json");

const PORT = 8080;

const hbSet = hb.create({
    helpers: {
        cohortName(name) {
            return name;
        },
        getYear() {
            return new Date().getFullYear();
        },
    },
});

app.engine("handlebars", hbSet.engine);

const path = require("path"); // Require 'path'

// handlebars
app.set("view engine", "handlebars");

// BODY
app.get("/", (req, res) => {
    res.render("students", {
        layout: "main",
        students,
        helpers: {
            upperCase(text) {
                return text.toUpperCase();
            },
        }, // Object to pass functions to templates
    });
});

app.get("/students", (req, res) => {
    res.render("home", {
        layout: "main",
        teachers,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        layout: "about",
    });
});

// END
app.listen(PORT, () => {
    console.log(`Checkpoint 0: Listening on port: ${PORT}`);
});
